function diff(a, b) {
    const result = {};
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        const value = b[key];
        if (Array.isArray(value)) {
            if (Array.isArray(a[key])) {
                const diffArray = value.filter((item, index) => item !== a[key][index]);
                if (diffArray.length > 0) {
                  result[key] = diffArray;
                }
            }
            else {
                result[key] = value;
            }
          
        } else if (typeof value === 'object') {
          const subDiff = diff(a[key], value);
          if (Object.keys(subDiff).length > 0) {
            result[key] = subDiff;
          }
        } else if (value !== a[key]) {
          result[key] = value;
        }
      }
    }
    return result;
  }
  