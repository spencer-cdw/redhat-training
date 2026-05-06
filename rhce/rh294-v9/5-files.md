# Files

Commonly used modules

- blockinfile
- copy
- fetch
- file
- lineinfile
- stat

Less common file modules in `ansible.posix`

- patch
- synchronize

# Templates

```yaml
tasks:
  - name: template render
    ansible.builtin.template:
      src: /tmp/j2-template.j2
      dest: /tmp/dest-config-file.txt
```

```
PermitRootLogin {{ root_allowed }}
AllowGroups {{ groups_allowed }}
```


## Loops

```
{% for user in users %}
      {{ user }}
{% endfor %}
```

```
{# for statement #}
{% for myuser in users if not myuser == "root" %}
User number {{ loop.index }} - {{ myuser }}
{% endfor %}
```

```
{% for myhost in groups['myhosts'] %}
{{ myhost }}
{% endfor %}
```

/etc/hosts example

```yaml
- name: /etc/hosts is up to **date**
  hosts: all
  gather_facts: yes
  tasks:
    - name: Deploy /etc/hosts
      ansible.builtin.template:
        src: templates/hosts.j2
        dest: /etc/hosts
```

```jinja
{% for host in groups['all'] %}
{{ hostvars[host]['ansible_facts']['default_ipv4']['address'] }} {{ hostvars[host]['ansible_facts']['fqdn'] }} {{ hostvars[host]['ansible_facts']['hostname'] }}
{% endfor %}
```


## Filters

```
{{ output | to_json }}
{{ output | to_yaml }}
```

```
{{ output | to_nice_json }}
{{ output | to_nice_yaml }}
```
