ansible-navigator inventory --mode stdout -i inventory/inventorya.py --graph webservers


inventory/inventorya.py --list
{"webservers": {"hosts": ["servera.lab.example.com"], "vars": {}​}​}

Always ensure you have a parent inventory defined when using a dynamic inventory script. If you do not, you will receive an error message

```
[webservers] #<- Ensure dynamic inventory includes this parent

[servers:children]
webservers
```


```
ansible-navigator inventory --mode stdout --graph
@all:
  |--@servers:
  |  |--@webservers:
  |  |  |--servera.lab.example.com
  |--@ungrouped:
  |  |--workstation.lab.example.com
```


ansible.cfg lets you define which hosts are part of inventory by default

```
[inventory]
enable_plugins = host_list, script, auto, yaml, ini, toml
```

# INI vs YAML

```ini
[lb_servers]
proxy.example.com

[web_servers]
web1.example.com
web2.example.com

[backend_server_pool]
appsrv-[a:e].example.com
```

```yaml
lb_servers:
  hosts:
    proxy.example.com:
web_servers:
  hosts:
    web1.example.com:
    web2.example.com:
backend_server_pool:
  hosts:
    appsrv-[a:e].example.com:
```

The all group is implicit, you can add it, or omit it
```yaml
all:
  children:
    lb_servers:
      hosts:
        proxy.example.com:
    web_servers:
      hosts:
        web1.example.com:
        web2.example.com:
    backend_server_pool:
      hosts:
        appsrv-[a:e].example.com:
```

## Ungrouped

There is an implicit 'ungrouped' group. 

```ini
notinagroup.example.com

[mailservers]
mail1.example.com
```

```yaml
all:
  children:
    ungrouped:
      notinagroup.example.com:
    mailservers:
      mail1.example.com:
```

## Vars

```ini
[databases]
maria1.example.com
localhost ansible_connection=local
maria2.example.com
[databases:vars]
foo=bar
```

```yaml
databases:
  hosts:
    maria1.example.com:
    localhost:
      ansible_connection: local
    maria2.example.com:
  vars:
    foo: bar
```

## Convert from ini to yaml

**Warning** This will only add vars to the first instance of a host, not all instances


```bash
ansible-navigator inventory --mode stdout -i inventory --list --yaml
```