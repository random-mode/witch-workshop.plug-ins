#! sh
# -*- coding: utf-8 -*-

echo "Formatting \`.js\` files:"
prettier --config ".prettierrc.json" \
         --write \
         "../.integration/**/*.js" \
         "../plugins/**/*.js"