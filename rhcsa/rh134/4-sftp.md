# sftp

sftp has an interactive shell

```bash
sftp bob@server
sftp> help
```


inside the sftp shell, you can interact with the local disk by prefixing the command with `l`

```bash
sftp> pwd
Remote working directory: /home/remoteuser
sftp> lpwd
Local working directory: /home/user
```


To upload/download a file from inside the sftp shell, use the `put` and `get` commands:

```bash
put -r directory
get /etc/yum.conf
```

# scp

`scp` uses rdp and is insecure! 
Use `sftp` or `rsync` instead. 

[How to exploit](https://github.com/cpandya2909/CVE-2020-15778):

```bash
scp  /sourcefile remoteserver:'`touch /tmp/exploit.sh`/targetfile'
```