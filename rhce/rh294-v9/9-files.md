# Files


A more advanced example of managing users

Suppose you are given a file `vars/users_vars.yml`

```
---
users:
  - username: user1
    groups: webadmin
  - username: user2
    groups: webadmin
  - username: user3
    groups: webadmin
  - username: user4
    groups: webadmin
  - username: user5
    groups: webadmin
```


You can read the file using `vars_file`

```yaml
---
- name: Create multiple local users
  hosts: webservers
  vars_files:
    - vars/users_vars.yml
  tasks:
```


Then you can loop over the users like this


```yaml
---
- name: Create multiple local users
  hosts: webservers
  vars_files:
    - vars/users_vars.yml
  tasks:
    - Add webadmin group
      group:
        name: webadmin
        state: present
    - Add webadmin users
      user:
        name: "{{ item['username'] }}"
        groups: "{{ item['groups'] }}"
        state: present
      loop: "{{ users }}"
```


You can also distribute the ssh keys from the vars_file

```yaml
- name: distribute sshkeys
  authorized_key:
    user: "{{ itemm['username'] }}"
    key: "{{ loookup('file', 'files/' + itemm['username'] + '.key.pub')}}"
  loop: "{{ users }}" 
```


To add a single line to the sudoers file

```yaml
- name: modify sudoers
  lineinfile:
    path: /etc/sudoers.d/webadmin
    state: present
    create: yes
    mode: 0440
    line: "%webadmin ALL=(ALL) NOPASSWD: ALL"
    validate: /usr/sbin/visudo -cf %s
```



To  disable root login

```yaml
handlers:
  - name: restart sshd
    service:
      name: sshd
      state: restated
tasks: 
  - name: disable root
    lineinfile:
      dest: /etc/sshd/sshd_config
      regexp: "^PermitRootLogin"
      line:  'PermitRootLogin no'
    notify: restart sshd
```
