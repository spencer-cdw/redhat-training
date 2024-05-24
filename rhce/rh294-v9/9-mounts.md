# Mounts

Easies way to manage mounts is with the ansible storage role

Find more information in `/usr/share/ansible/roles/rhel-system-roles.storage/README.md` and `/usr/share/doc/rhel-system-roles/storage/`

On the test, run `firefox /usr/share/doc/rhel-system-roles/storage/README.html`


Storage role works with 2 options

https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_file_systems/managing-local-storage-using-rhel-system-roles_managing-file-systems


- `storage_volumes` (raw disks or raid)
- `storage_pools` (lvm)



```yaml
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


You can alternativly pass the vars in under the vars section

```yaml
---
- hosts: managed-node-01.example.com
  roles:
    - rhel-system-roles.storage
  vars:
    storage_pools:
      - name: myvg
        disks:
          - sda
          - sdb
          - sdc
        volumes:
          - name: mylv
            size: 2G
            fs_type: ext4
            mount_point: /mnt/data
```


## Facts

Information about drives is available in the `ansible_facts['devices']` fact.

e.g. get drive size

```
{{ ansible_facts['devices']['sda']['sectors'] * ansible_facts['devices']['sda']['sectorsize'] }}
```

`ansible_facts['mounts']` fact provides information about the currently mounted devices on the managed host.
