# Config


ansible navigator doesn't work with `--a



## Deploy ssh key

Example playbook to deploy your ssh key everywhere (ssh-copy-id)
(be sure to disable palybook-artifacts inansible-navigator.yaml and use `--ask-pass` option)
```
- name: Public key is deployed to managed hosts for Ansible
  hosts: all

  tasks:
    - name: Ensure key is in root's ~/.ssh/authorized_hosts
      ansible.posix.authorized_key:
        user: root
        state: present
        key: '{{ item }}'
      with_file:
        - ~/.ssh/id_rsa.pub
```