# Mounts

Easies way to manage mounts is with the ansible storage role

Find more information in `/usr/share/ansible/roles/rhel-system-roles.storage/README.md` and `/usr/share/doc/rhel-system-roles/storage/`


```
---
- name: Mounts
  hosts: webservers
  roles:
    - name: redhat.rhel_system_roles.storage
      storage_pools:
        - name: vg01
          type: lvm
          disks:
            - /dev/vdb
          volumes:
            - name: lvol1
              size: 128m
              fs_type: xfs
              state: present
```




## swap

```yaml
---
- name: Configure a swap volume
  hosts: all

  roles:
    - name: redhat.rhel_system_roles.storage
      storage_pools:
        - name: vgswap
          type: lvm
          disks:
            - /dev/vdb
          volumes:
            - name: lvswap
              size: 512m
              fs_type: swap
```
