# Users


Crate a ssh key

```yaml
- name: Create an SSH key for user1
  ansible.builtin.user:
    name: user1
    generate_ssh_key: true
    ssh_key_bits: 2048
    ssh_key_file: .ssh/id_my_rsa
```


## Known Hosts


```yaml
- name: Copy host keys to remote servers
  ansible.builtin.known_hosts:
    path: /etc/ssh/ssh_known_hosts
    name: servera.lab.example.com
    key: servera.lab.example.com,172.25.250.10 ssh-rsa ASDeararAIUHI324324
```


```yaml
- name: Copy host keys to remote servers
  ansible.builtin.known_hosts:
    path: /etc/ssh/ssh_known_hosts
    name: serverb
    key: "{{ lookup('ansible.builtin.file', 'pubkeys/serverb') }}"
```


```yaml
- name: Configure /etc/ssh/ssh_known_hosts files
  hosts: all

  tasks:
    - name: Collect RSA keys
      ansible.builtin.slurp:
        src: /etc/ssh/ssh_host_rsa_key.pub
      register: rsa_host_keys

    - name: Collect Ed25519 keys
      ansible.builtin.slurp:
        src: /etc/ssh/ssh_host_ed25519_key.pub
      register: ed25519_host_keys

    - name: Deploy known_hosts
      ansible.builtin.known_hosts:
        path: /etc/ssh/ssh_known_hosts
        name: "{{ item[0] }}"
        key: "{{ hostvars[ item[0] ]['ansible_facts']['fqdn'] }} {{ hostvars[ item[0] ][ item[1] ]['content'] | b64decode | trim }}"
        state: present
      with_nested:
        - "{{ ansible_play_hosts }}"
        - [ 'rsa_host_keys', 'ed25519_host_keys' ]
```

```yaml
- name: Set authorized key
  ansible.posix.authorized_key:
    user: user1
    state: present
    key: "{{ lookup('ansible.builtin.file', 'files/user1/id_rsa.pub') }}"
```

The same thing but with string interpolation

```yaml
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

This dynamically references `files/bob.key.pub`, `files/sally.key.pub`

```yaml
- name: authorized key
ansible.posix.authorized_key:
    user: "{{ item['username'] }}"
    key: "{{ lookup('file', 'files/'+ item['username'] +'.key.pub') }}"
    loop: "{{ users }}"
```

## Sudoers

You can find these examples in `ansible-doc lineinfile`

```yaml
- name: modify sudoers
  ansible.builtin.lineinfile:
    path: /etc/sudoers.d/webadmin
    state: present
    create: yes
    mode: 0440
    line: "%webadmin ALL=(ALL) NOPASSWD: ALL"
    validate: /usr/sbin/visudo -cf %s
```

## Generate passwords

If you need to generate a password, you can use `password_hash('sha512')`

```bash
ansible all -i localhost, -m debug -a "msg={{ 'mypassword' | password_hash('sha512', 'mysecretsalt') }}"
```
```bash
ansible localhost -m debug -a "msg={{ 'correct-horse-battery-staple' | password_hash('sha512', 'foobar') }}"
```
