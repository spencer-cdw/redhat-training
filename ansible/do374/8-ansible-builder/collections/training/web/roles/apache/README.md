apache
======

That role deploys and starts Apache HTTP Server on the targeted hosts.

Requirements
------------

None

Role Variables
--------------

None

Dependencies
------------

None

Example Playbook
----------------

```yaml
---
- name: Installing Apache HTTP Server
  hosts: webservers
  become: true
  gather_facts: false

  tasks:
    - name: Ensure Apache HTTP Server is installed and started
      ansible.builtin.include_role:
        name: apache

    - name: Ensure the firewall port is opened for HTTP
      ansible.posix.firewalld:
        service: http
        permanent: true
      state: enabled
```

License
-------

GPL 3.0 or later

Author Information
------------------

Red Hat Training <training@redhat.com>
