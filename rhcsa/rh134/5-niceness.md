# NIceness


### Range

-20 (increased priority)
+19 (decreased priority)

Users can decrease their own priority, but only root can increase it.

Nice values map to a priority value, and both values are available for viewing in process listing commands. A nice value of -20 maps to a 0 priority in the top command. A nice value of 19 maps to a 39 priority in the top command.

![](https://rol.redhat.com/rol/static/static_file_cache/rh134-9.0/tuning/priority-and-nice-values.svg)  



ps axo pid,comm,nice,cls --sort=-nice

## Custom nice

```bash
nice -n 15 sleep 60 &
ps -o pid,comm,nice -C sleep
```

## Change nice

`renice -n 19 1234`

or renice from `top`

`top -p $(pgrep sleep)`
Then press `r` to renice. 