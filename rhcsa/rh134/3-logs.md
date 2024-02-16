journalctl -o verbose


journalctl _SYSTEMD_UNIT=sshd.service _PID=2110

```bash
_COMM is the command name.
_EXE is the path to the executable file for the process.
_PID is the PID of the process.
_UID is the UID of the user that runs the process.
_SYSTEMD_UNIT is the systemd unit that started the process.
```

    journalctl _PID=1

    journalctl --since 06:49:00 --until 07:19:00


# Rsyslog

    save configs to /etc/rsyslog.d/*.conf

Format

    *.debug /var/log/messages-debug

    systemctl restart rsyslog



## Rsyslog Priority Levels Example

Example to setup a new priority level and send mesage to file

```bash
# /etc/rsyslog.d/auth-errors.conf
authpriv.alert /var/log/auth-errors
```

```bash
sudo systemctl restart rsyslog
```

```bash
logger -p authpriv.alert "This is a test"
```

```bash
sudo tail /var/log/auth-errors
```

    0	emerg	System is unusable
    1	alert	Action must be taken immediately
    2	crit	Critical condition
    3	err	Non-critical error condition
    4	warning	Warning condition
    5	notice	Normal but significant event
    6	info	Informational event
    7	debug	Debugging-level message