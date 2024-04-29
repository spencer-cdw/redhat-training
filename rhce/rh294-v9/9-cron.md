# Cron & Boot

Delete a user in 20 minutes

```yaml
- name: Remove tempuser
  ansible.posix.at:
    command: userdel -r tempuser
    count: 20
    units: minutes
    unique: yes
```

```yaml
- name: Schedule backups for my home directory
  ansible.builtin.cron:
    name: Backup my home directory
    user: testing
    job: /home/testing/bin/backup-home-dir
    minute: 0
    hour: 16
    weekday: 5
```


Add a cron

```yaml
---
- name: Recurring cron job
  hosts: webservers
  become: true

  tasks:
    - name: Crontab file exists
      ansible.builtin.cron:
        name: Add date and time to a file
        job: date >> /home/devops/my_date_time_cron_job
        minute: "*/2"
        hour: 9-16
        weekday: 1-5
        user: devops
        cron_file: add-date-time
        state: present
```

To run every 2 minutes

```yaml
---
- hosts: localhost
  tasks:
    - name: Schedule a task to run 'echo hi' every 2 minutes
      cron:
        name: "Echo hi every 2 minutes"
        minute: "*/2"
        job: "echo hi >> /tmp/hi.txt"
```


## Reboot

Reboot host
```yaml
- name: Reboot now
  ansible.builtin.reboot:
```
