You can set the `serial` in 2 places

1. ansible.cfg

```bash
ansible navigator config dump -m stdout
```

2. In the playbook

```yaml
- name: Update Webservers
  hosts: web_servers
  serial: 2
```

You can also do percentages

```yaml
- name: Update Webservers
  hosts: web_servers
  serial: 25%
```

You can also do a fibinachi deploy where it deploys to 1 batch, then 10%, then the remaining hosts
```yaml
- name: Update Webservers
  hosts: web_servers
  serial:
    - 1
    - 10%
    - 100%
```

By default, Ansible only halts play execution when all hosts in a batch fail. However, you might want a play to abort if more than a certain percentage of hosts in the inventory fail, even if no entire batch fails. It is also possible to "fail fast" and abort the play if any tasks fail.

```yaml
- name: Update Webservers
  hosts: web_servers
  max_fail_percentage: 30%
  serial:
    - 2
    - 10%
    - 100%
```



### Failure Summary
```
IMPORTANT
To summarize the Ansible failure behavior:

If the serial directive and the max_fail_percentage values are not defined, all hosts are run through the play in one batch. If all hosts fail, then the play fails.

If the serial directive is defined, then hosts are run through the play in multiple batches, and the play fails if all hosts in any one batch fail.

If the max_fail_percentage directive is defined, the play fails if more than that percentage of hosts in a batch fail.

If a play fails, Ansible aborts all remaining plays in the playbook.
```

