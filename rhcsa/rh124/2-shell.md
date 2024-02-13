## Globbing

ls a*
ls *a*
ls [ac]* # starts with a or c
ls ???? # 4 characters

## Brace Expansion

echo file{1..10}.txt

echo file{a{1,2},b,c}.txt
echo file{a,b}{1,2}.txt


## Command substitution

echo today is $(date +%A)

echo The time is $(date +%M) minutes past $(date +%l%p).
The time is 26 minutes past 11AM.

```
$() is prefered over the older `` syntax
```