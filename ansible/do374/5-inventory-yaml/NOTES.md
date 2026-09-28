Convert ini to yaml

ini
```bash
[active web servers]
server[b:c].lab.example.com

[inactive web servers] 
server[d:f].lab.example.com

[web servers: children]
active web_servers 
inactive web_servers

[all_servers]
servera.lab.example.com

[all_servers: children]
web_servers
```


yaml
```yaml
active web _servers:
    hosts:
        server[b:c].lab.example.com
    vars:
inactive web_servers:
    hosts:
        server[d:f].lab.example.com
    vars:
web_servers: 
    children:
        active_web_servers
        inactive_web_servers
    
all servers:
    hosts:
        servera.Lab.example.com
    children:
        web_servers
```

# Best Practices

Best practice is to use group vars with a folder that maps to roles

```yaml
[user@host project3]$ tree -F group_vars
group_vars/
├── all/
│   └── common.yml
├── db_servers/
│   ├── mysql.yml
│   └── firewall.yml
├── lb_servers/
│   ├── firewall.yml
│   ├── haproxy.yml
│   └── ssl.yml
└── web_servers/
    ├── firewall.yml
    ├── webapp.yml
    └── apache.yml
```

Some variables are best defined at the host level

- ansible_connection
- ansible_host
- ansible_prot
- ansible_user
- ansible_become_user
- ansible_pytyhon_interpreter
  

```yaml
web_servers:
  hosts:
    webserver_1:
      ansible_host: server100.example.com
    webserver_2:
      ansible_host: server101.example.com
    webserver_3:
      ansible_host: server102.example.com
lb_servers:
  hosts:
    loadbalancer:
      ansible_host: server103.example.com
```


Another example of using aliases 
Notice how `loadbalancer_1`is just an alias for servera.lab.example.com

```yaml
all:
  children:
    lb_servers:
      hosts:
        loadbalancer_1:
          ansible_host: servera.lab.example.com
    ungrouped: {}
    web_servers:
      children:
        a_web_servers:
          hosts:
            backend_a1:
              ansible_host: serverb.lab.example.com
        b_web_servers:
          hosts:
            backend_b1:
              ansible_host: serverc.lab.example.com

```