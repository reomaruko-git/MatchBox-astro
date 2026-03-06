#!/usr/bin/env python3
"""FTP deploy script: mirrors ./dist/ to remote server with delete support."""

import ftplib
import os
import sys
from pathlib import Path

FTP_HOST = "yakuzaisupport.com"
FTP_USER = "xeksluro"
FTP_PASS = "0XF]vNmwB38e1("
REMOTE_PATH = "/public_html/match-box"
LOCAL_PATH = Path("./dist")

def get_remote_files(ftp, remote_dir):
    """Return a dict of {relative_path: size} for all files under remote_dir."""
    files = {}
    try:
        items = []
        ftp.retrlines(f"LIST {remote_dir}", items.append)
        for item in items:
            parts = item.split(None, 8)
            if len(parts) < 9:
                continue
            name = parts[8]
            if name in (".", ".."):
                continue
            if item.startswith("d"):
                sub = f"{remote_dir}/{name}"
                files.update(get_remote_files(ftp, sub))
            else:
                size = int(parts[4])
                rel = f"{remote_dir}/{name}"
                files[rel] = size
    except ftplib.error_perm:
        pass
    return files

def ensure_remote_dir(ftp, remote_dir):
    """Create remote directory if it doesn't exist."""
    parts = remote_dir.strip("/").split("/")
    path = ""
    for part in parts:
        path += f"/{part}"
        try:
            ftp.mkd(path)
        except ftplib.error_perm:
            pass  # Already exists

def upload_file(ftp, local_file, remote_path):
    """Upload a single file."""
    remote_dir = "/".join(remote_path.split("/")[:-1])
    ensure_remote_dir(ftp, remote_dir)
    with open(local_file, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print(f"  ↑ {remote_path}")

def delete_remote_file(ftp, remote_path):
    """Delete a remote file."""
    try:
        ftp.delete(remote_path)
        print(f"  ✗ {remote_path}")
    except ftplib.error_perm as e:
        print(f"  ! delete failed: {remote_path} ({e})")

def main():
    if not LOCAL_PATH.exists():
        print(f"Error: {LOCAL_PATH} does not exist. Run 'npm run build' first.")
        sys.exit(1)

    print(f"Connecting to {FTP_HOST}...")
    ftp = ftplib.FTP()
    ftp.connect(FTP_HOST, 21, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    print("Connected!\n")

    # Build local file list
    local_files = {}
    for local_file in LOCAL_PATH.rglob("*"):
        if local_file.is_file():
            rel = local_file.relative_to(LOCAL_PATH)
            remote = f"{REMOTE_PATH}/{str(rel).replace(os.sep, '/')}"
            local_files[remote] = local_file

    # Get remote file list
    print("Scanning remote files...")
    remote_files = get_remote_files(ftp, REMOTE_PATH)
    print(f"  Remote: {len(remote_files)} files")
    print(f"  Local:  {len(local_files)} files\n")

    # Upload new/changed files
    uploaded = 0
    for remote_path, local_file in local_files.items():
        local_size = local_file.stat().st_size
        remote_size = remote_files.get(remote_path)
        if remote_size != local_size:
            upload_file(ftp, local_file, remote_path)
            uploaded += 1

    # Delete remote files not in local
    deleted = 0
    for remote_path in list(remote_files.keys()):
        if remote_path not in local_files:
            delete_remote_file(ftp, remote_path)
            deleted += 1

    ftp.quit()
    print(f"\nDone! Uploaded: {uploaded}, Deleted: {deleted}")

if __name__ == "__main__":
    main()
