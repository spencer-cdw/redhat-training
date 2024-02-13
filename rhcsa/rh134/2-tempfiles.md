# temp files


On rhel, the systemd-tmpfiles-setup systemd service runs systemd-tmpfiles --create which reads from 

- /usr/lib/tmpfiles.d/*.conf
- /run/tmpfiles.d/*.conf
- /etc/tmpfiles.d/*.conf
  
systemd-tmpfiles



## Clean temp files

```bash
systemd-tmpfiles --clean filename
```

example of tmpfile config (this deletes the file after 30s)

d /run/momentary 0700 root root 30s
