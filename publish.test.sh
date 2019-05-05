git checkout test
git pull
git merge develop
git push
npm run build:test

sshpass -p 'hengtian' ssh root@192.168.5.157 "cd /usr/share/nginx/workflow/; rm -rf *"
sshpass -p hengtian scp -r dist/* root@192.168.5.157:/usr/share/nginx/workflow/.
git checkout develop
git merge test
