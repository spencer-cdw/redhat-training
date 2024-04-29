# Imports

Wrapper playbooks


```yaml
- name: Prepare the web server
  import_playbook: web.yml

- name: Prepare the database server
  import_playbook: db.yml
```

Another exmaple, notice that import_playbook can only be run at the top playbook level, it can not be used inside a play

```yaml
- name: Play 1
  hosts: localhost
  tasks:
    - ansible.builtin.debug:
        msg: Play 1

- name: Import Playbook
  import_playbook: play2.yml
```

## Importing task

Note that when doing an 'import', you can't do loops. Conditionals will run for _each_ task 

Imports are statically imported when the task is parsed.

```
---
- name: Install web server
  hosts: webservers
  tasks:
  - import_tasks: webserver_tasks.yml
```


## Include_tasks

Includes are _dynamic_. It does not parse the playbook until that section of the play is reached. 

```yaml
---
- name: Install web server
  hosts: webservers
  tasks:
  - include_tasks: webserver_tasks.yml
```

`ansible-navigator run --list-tasks` does not display includes (since they are not parsed yet).
`ansible-navigator run --start-at-task` does not work with includes. 

## include

`include` is legacy and is depricated. Use `include_tasks` or `import_tasks`.


## Example

Here is an example of
- import_tasks
- include_tasks
- import_playbook

```yaml
---
- name: Configure web server
  hosts: servera.lab.example.com

  tasks:
    - name: Include the environment task file and set the variables
      include_tasks: tasks/environment.yml
      vars:
        package: httpd
        service: httpd

    - name: Import the firewall task file and set the variables
      import_tasks: tasks/firewall.yml
      vars:
        firewall_pkg: firewalld
        firewall_svc: firewalld
        rule:
          - http
          - https

    - name: Import the placeholder task file and set the variable
      import_tasks: tasks/placeholder.yml
      vars:
        file: /var/www/html/index.html

- name: Import test play file and set the variable
  import_playbook: plays/test.yml
  vars:
    url: 'http://servera.lab.example.com'
```

Here is an example of

- import_roles

```yaml
- name: Run a role as a task
  hosts: remote.example.com
  tasks:
    - name: A task to include role2 here
      ansible.builtin.import_role:
        name: role2
      vars:
        var1: val1
        var2: val2
```
