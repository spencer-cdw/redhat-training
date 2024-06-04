# Firewall

Use `firewall` collection

```yaml
- name: Enabling http rule
  ansible.posix.firewalld:
    service: http
    permanent: yes
    state: enabled
```


## Facts

Ansible facts for network interafaces

- `ansible_facts['interfaces']`
- `ansible_facts['eth0']
