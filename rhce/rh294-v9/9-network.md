# Network

To configure network use `redhat.rhel_system_roles.network`. 
For documentation see /usr/share/ansible/roles/redhat.rhel_system_roles.network/README.md

```yaml
- name: NIC Configuration
  hosts: webservers
  vars:
    network_connections:
      - name: ens4
        type: ethernet
        ip:
          address:
            - 172.25.250.30/24
  roles:
    - redhat.rhel_system_roles.network
```
