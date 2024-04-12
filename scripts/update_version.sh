#!/bin/bash

PACKAGE_JSON="package.json"

# Check arguments
if [ $# -ne 1 ]; then
  echo "Usage: $0 [Patch|Minor|Major]"
  exit 1
fi


case $1 in
  Patch)
    VERSION_PART=3
    VERSION_INCREMENT=0.0.1
    ;;
  Minor)
    VERSION_PART=2
    VERSION_INCREMENT=0.1.0
    ;;
  Major)
    VERSION_PART=1
    VERSION_INCREMENT=1.0.0
    ;;
  *)
    echo "Invalid argument. Use 'Patch', 'Minor', or 'Major'."
    exit 1
    ;;
esac

# Get current version
CURRENT_VERSION=$(jq -r '.version' $PACKAGE_JSON)

# Calculate new version
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.${VERSION_PARTS[2]}"

case $VERSION_PART in
  1)
    NEW_VERSION=$(echo "$NEW_VERSION" | awk -F. -v OFS=. '{$1+=1;$2=0;$3=0}1')
    ;;
  2)
    NEW_VERSION=$(echo "$NEW_VERSION" | awk -F. -v OFS=. '{$2+=1;$3=0}1')
    ;;
  3)
    NEW_VERSION=$(echo "$NEW_VERSION" | awk -F. -v OFS=. '{$3+=1}1')
    ;;
esac

# Replace version in package.json
jq --arg version "$NEW_VERSION" '.version = $version' $PACKAGE_JSON > tmp.json && mv tmp.json $PACKAGE_JSON

echo "Version updated from $CURRENT_VERSION to $NEW_VERSION"