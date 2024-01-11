firewall
========

The role installs firewalld on the targeted hosts and configure ports and
services.

Requirements
------------

None

Role Variables
--------------

The role accepts the `firewall_rules` variable. That variable is a list of
services and ports to open. Each item is a dictionary with the following
keys (all are optional):

* `service` is a firewalld service name. Use the `firewall-cmd --get-services`
  command to get the list of services.
  The `service` key is mutually exclusive with `port`.
* `port` is a port number or a range of port numbers. The port type, `tcp` or
  `udp`, must be provided after the port number. For example, `8440/tcp`,
  `111/udp`, or `1234-1250/tcp`.
* `zone` is the firewalld zone. You can list the available zones by using the
  `firewall-cmd --list-all-zones` or `firewall-cmd --get-zones` commands.
* `source` is the source IP address or a network IP address with a mask.

By default, the `firewall_rules` variable is empty.

Dependencies
------------

The role requires the `ansible.posix` collection.

Example Playbook
----------------

```yaml
---
- name: Installing the firewall and opening some ports
  hosts: webservers
  become: true
  gather_facts: false

  tasks:
    - name: Ensure the firewall is configured for the web services
      ansible.builtin.include_role:
        name: firewall
      vars:
        firewall_rules:
          - service: http
            zone: internal
          - port: 8440-8450/tcp
```

License
-------

GPL 3.0 or later

Author Information
------------------

Red Hat Training <training@redhat.com>
