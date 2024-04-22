# Blocks

You can logically group tasks together with a block

```yaml
- name: block example
  hosts: all
  tasks:
    - name: installing and configuring DNF versionlock plugin
      block:
      - name: package needed by dnf
        ansible.builtin.dnf:
          name: python3-dnf-plugin-versionlock
          state: present
      - name: lock version of tzdata
        ansible.builtin.lineinfile:
          dest: /etc/yum/pluginconf.d/versionlock.list
          line: tzdata-2016j-1
          state: present
      when: ansible_distribution == "RedHat"
```


## Rescue

```yaml
  tasks:
    - name: Upgrade DB
      block:
        - name: upgrade the database
          ansible.builtin.shell:
            cmd: /usr/local/lib/upgrade-database
      rescue:
        - name: revert the database upgrade
          ansible.builtin.shell:
            cmd: /usr/local/lib/revert-database
      always:
        - name: always restart the database
          ansible.builtin.service:
            name: mariadb
            state: restarted
```
