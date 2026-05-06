# Handlers

```yaml
tasks:
  - name: foo
    template:
      src: /foo
      dest: /bar
    notify: 
      - restart apache

handlers:
  - name: restart apache
    service: 
      name: httpd
      state: restarted
```


### Rules

Handlers always run in the order specified by the handlers section of the play. They do not run in the order in which they are listed by notify statements in a task, or in the order in which tasks notify them.

Handlers normally run after all other tasks in the play complete. A handler called by a task in the tasks part of the playbook does not run until all tasks under tasks have been processed (some exceptions to this)

Handler names exist in a per-play namespace. If two handlers are incorrectly given the same name, only one of them runs.


## Forcing handlers

```yaml
- hosts: all
  force_handlers: yes
```

Handlers normally only run on success, if you set `force_handlers` it will also run on failures. 

If you have ignore_errors: yes set on a task or for the task's play, if that task fails the failure is ignored. In that case, the play keeps running and handlers still run, even if you have force_handlers: no set, unless some other error causes the play to fail.

If you set force_handlers: yes on the play, then any handlers that have been notified are run even if a later task failure causes the play to fail. Otherwise, handlers are not run at all when a play fails.

Setting force_handlers: yes on a play does not cause handlers to be notified for tasks that report ok or failed; it only causes the handlers to run that have already been notified before the point at which the play failed.


## Failed_when


```yaml
tasks:
  - name: Run user creation script
    ansible.builtin.shell: /usr/local/bin/create_users.sh
    register: command_result
    failed_when: "'Password missing' in command_result.stdout"
```
