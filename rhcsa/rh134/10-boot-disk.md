# boot disk

Each line that is added to /etc/fstab is automatically converted into a systemd unit file.

When modifying /etc/fstab, you must run systemctl daemon-reload to update the systemd unit files.