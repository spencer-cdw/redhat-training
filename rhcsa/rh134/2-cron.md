# at

    at now +5min < foo.sh
    at 21:00 < foo.sh

If you omit the date, `at` will intellegently assume today (or tomorrow if the time has already passed)

    echo "date >> /home/student/myjob.txt" | at now +2min

### List at jobs

    atq


    at -c JOBNUMBER # view specific job

### Easter eggs

    at has a 'teatime' alias which is 4pm


### Delete job

    atrm JOBNUMBER

## Queues

`at` can have multiple queues, the default queue is `a`

To specify a different queue. 

    at -q b 10:45 < foo.sh


# Cron

The man pages for cron do not have clear examples of how to format. 
The best man page is the posix page `1p` `man 1p crontab`

The best explination is stored in a fele `/etc/crontab`

```bash
cat /etc/crontab

    crontab -l # list all jobs
    crontab -r # remove all jobs for user
    contab -e # edit jobs for current user


    minute | hour | day of month | month | day of week | command

    * = any value
    , = seperator
    - = range
    / = step (fraction)


## Cron.d

Remember to chmod con files

    chmod +x /etc/cron.daily/usercount


## SystemD Timer

SystemD has a timer feature that can be used to schedule jobs

    dnf install sysstat
    cp /usr/lib/systemd/system/sysstat-collect.timer \
    /etc/systemd/system/sysstat-collect.timer

```
...output omitted...
# Activates activity collector every 2 minutes

[Unit]
Description=Run system activity accounting tool every 2 minutes

[Timer]
OnCalendar=*:00/2

[Install]
WantedBy=sysstat.service
```

    systemctl daemon-reload
    systemctl enable --now sysstat-collect.timer