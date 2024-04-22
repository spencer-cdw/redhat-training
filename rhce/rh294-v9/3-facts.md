# Facts

Prior to ansible 2.5, facts were always injected with reserved names

- ansible_hostname
- ansible_fqdn

After 2.5 they standarzied on the hash syntax

- ansible_facts['hostname']
- ansible_facts['fqdn']
- ansible-facts['default_ipv4']['address']


### Force gather facts

You can gather facts even if gather facts is no

```
- name: Collect all facts except for hardware facts
  ansible.builtin.setup:
    gather_subset:
      - !hardware
```

### Magic vars

- hostvars
- group_names
- groups
- inventory_hostname

```yaml
    - name: Print list of network interfaces for demo2
      ansible.builtin.debug:
        var: hostvars['demo2.example.com']['ansible_facts']['interfaces']
```


### Custom facts

Save in `/etc/ansible/facts.d`

custom.facts

```bash
[general]
foo = bar
```

Then reference it like so

```
"{{ ansible_facts['ansible_local']['custom']['general']['foo']}}
```
