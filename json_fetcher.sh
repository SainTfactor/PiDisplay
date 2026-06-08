OUTPUT_FOLDER=/var/www/html/PiDisplay/json
SUBREDDITS=("todayilearned" "worldnews" "technews")

echo "Fetching reddit main page..."
echo

curl -L -c /tmp/jar.txt -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36" https://reddit.com > /tmp/main_page.txt 2> /dev/null

TMP="$(cat /tmp/main_page.txt  | grep "e+e" | grep -oP '\)\(\"[^"]+' | cut -d \" -f 2)"
SOL="$TMP$TMP"
TOK="$(cat /tmp/main_page.txt  | grep token | grep -oP 'value="[^"]+' | cut -d \" -f 2)"

echo "Found token: $TOK"
echo "Found solution: $SOL"
echo

echo "Fetching cookies..."
echo

curl -L -b /tmp/jar.txt -c /tmp/jar.txt -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36" "https://reddit.com/?solution=$SOL&js_challenge=1&token=$TOK&jsc_orig_r=" > /dev/null 2> /dev/null

echo "Cookie jar contents:"
cat /tmp/jar.txt
echo

echo "Cleaning out old json files..."
echo

rm -f $OUTPUT_FOLDER/*.json

echo "Fetching subreddit jsons:"
for SUB in ${SUBREDDITS[@]}; do
  echo " - Fetching $SUB..."
  curl -b /tmp/jar.txt -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36" "https://old.reddit.com/r/$SUB.json?limit=100" > $OUTPUT_FOLDER/$SUB.json 2> /dev/null
done
echo

echo "Done.  Cleaning up..."
echo 

rm /tmp/jar.txt
rm /tmp/main_page.txt

echo "Congrats!  Here are your files:"
ls -alh $OUTPUT_FOLDER
