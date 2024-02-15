# Reset root password

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch10s03

Press any key during boot to enter grub menu (also try `esc` or `shift+esc`)

Append to the line that starts with `linux` with `rd.break` and press `ctrl+x` to boot

The system will boot with the disk readonly at `/sysroot`

```bash
mount -o remount,rw /sysroot
chroot /sysroot
touch /.autorelabel #This ensures that SELinux relabels the entire file system on the next boot
exit
exit #must enter twice
```

Then change the password with `passwd`

```bash
passwd root
```

## rd.break

`rd.break` stands for "ramdisk break"

## Targets

In the bootloader, add the following to the 'linux' line

- `systemd.unit=rescue.target`
- `systemd.unit=emergency.target` (emergency loads more services such as logging)

Both of these mount the root volume as read only, `mount -o remount,rw /` to make it writable

- `systemctl list-jobs` to see what services are stuck

## Cloud recovery

Cloud based systems don't have a rescue kernel

