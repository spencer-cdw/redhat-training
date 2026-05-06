# Facts

Prior to ansible 2.5, facts were always injected with reserved names

- ansible_hostname
- ansible_fqdn

After 2.5 they standarzied on the hash syntax

- ansible_facts['hostname']
- ansible_facts['fqdn']
- ansible_facts['default_ipv4']['address']


### Force gather facts

You can gather facts even if gather facts is no

```yaml
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

```yaml
[general]
foo = bar
```

Then reference it like so

```bash
"{{ ansible_facts['ansible_local']['custom']['general']['foo']}}
```


## Tips

To get all facts

```bash
ansible foo.example.com -m setup
```

or

(however since facts are stateless, this may not work in all situations)

```bash
ansible foo.example.com -m debug -a "msg={{ ansible_facts }}"
ansible foo.example.com -m debug -a "msg={{ group_names }}"
ansible foo.example.com -m debug -a "msg={{ groups }}"
ansible foo.example.com -m debug -a "msg={{ hostvars }}"
```

Here is a more verbose example that works in all situations

```yaml
- hosts: localhost
  tasks:
    - name: Gather facts
      setup:

    - name: Display facts
      debug:
        var: ansible_facts
```

Or a more programatic way

```
ansible -m setup localhost -o | sed 's/^.*=> //' | jq .
```
