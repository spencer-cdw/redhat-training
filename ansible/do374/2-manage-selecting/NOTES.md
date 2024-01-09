## Manage Selecting

Shows how to select and inspect different exectuion environments



podman login hub.lab.example.com
ansible-navigator images --eei hub.lab.example.com/ee-minimal-rhel8

Select the image, then select 2 (ansible version and collections) to see what is installed

```
  Image: ee-minimal-rhel8:latest (primary) Description
0│Image information                        Information collected from image inspection
1│General information                      OS and python version information
2│Ansible version and collections          Information about ansible and ansible collections
3│Python packages                          Information about python and python packages
4│Operating system packages                Information about operating system packages
5│Everything                               All image information
```
```
Image: ee-supported-rhel8:latest (primary) (Information about ansible and ...
 0│---
 1│ansible:
 2│ collections:
 3│   details:
 4|     amazon.aws: 3.2.0
 5│	    ansible.controller: 4.2.1
 6│	    ansible.netcommon: 3.1.1
 7│	    ansible.network: 1.2.0
 8│	    ansible.posix: 1.3.0
 9│	    ansible.security: 1.0.0
...output omitted...
```