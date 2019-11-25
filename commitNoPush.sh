message=${1:-patch update}

git add ./
git commit -m "$message"