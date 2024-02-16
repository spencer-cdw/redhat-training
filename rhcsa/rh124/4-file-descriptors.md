# File descriptors 

`> 2 /dev/null`

```
> foo 2>&1 foo.log #write both stdout and stderr to foo.log
&> foo.log #write both stdout and stderr to foo.log
```

```bash
&> file
> file 2>&1
```


## Pipeline

When combining redirection and pipelineing, the shell sets up the entire pipeline first, then redirects output. 

for example the following will not work because 'less' does not receive the output

```
 ls > /tmp/saved-output | less
```

### Tee

Tee overcomes this copying its standard input to its standard output. 

```
ls -l | tee /tmp/foobar | less
```

The reason why you might want to use `tee` at the end is that is shows what it is writing to a file as it saves. 