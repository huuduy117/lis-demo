function bruteForce() {
  const input = document.getElementById("inputArray").value;
  const arr = input.split(",").map(Number);
  const n = arr.length;
  let maxLen = 1;
  let lis = []; // Mảng lưu các dãy con tăng dài nhất

  // Hàm kiểm tra dãy con có tăng dần không
  function isIncreasing(subseq) {
    for (let i = 1; i < subseq.length; i++) {
      if (subseq[i] <= subseq[i - 1]) {
        return false;
      }
    }
    return true;
  }

  // Hàm lấy tất cả các dãy con
  function getSubsequences(arr) {
    const result = [];
    const total = Math.pow(2, arr.length);
    for (let i = 0; i < total; i++) {
      let subsequence = [];
      for (let j = 0; j < arr.length; j++) {
        if ((i >> j) & 1) {
          subsequence.push(arr[j]);
        }
      }
      if (subsequence.length > 1 && isIncreasing(subsequence)) {
        result.push(subsequence);
      }
    }
    return result;
  }

  const subsequences = getSubsequences(arr);

  // Tìm dãy con tăng dài nhất
  subsequences.forEach((subseq) => {
    if (subseq.length > maxLen) {
      maxLen = subseq.length;
      lis = [subseq]; // Cập nhật dãy con dài nhất
    } else if (subseq.length === maxLen) {
      lis.push(subseq); // Thêm dãy con có cùng độ dài
    }
  });

  document.getElementById(
    "result"
  ).textContent = `Dãy con tăng dài nhất có độ dài: ${maxLen}`;

  // Hiển thị các dãy con tăng dài nhất
  lis.forEach((subseq, index) => {
    const p = document.createElement("p");
    p.textContent = `Dãy con tăng dài nhất thứ ${index + 1}: ${subseq.join(
      ", "
    )}`;
    document.getElementById("result").appendChild(p);
  });
}

function dynamicProgramming() {
  const input = document.getElementById("inputArray").value;
  const arr = input.split(",").map(Number);
  const n = arr.length;
  let dp = Array(n).fill(1);
  let maxLen = 1;
  let steps = [];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
    steps.push(`dp[${i}] = ${dp[i]} (Dãy con kết thúc tại ${arr[i]})`);
  }

  document.getElementById(
    "result"
  ).textContent = `Dãy con tăng dài nhất có độ dài: ${maxLen}`;
  steps.forEach((step) => {
    const p = document.createElement("p");
    p.textContent = step;
    document.getElementById("result").appendChild(p);
  });
}

function binarySearchDP() {
  const input = document.getElementById("inputArray").value;
  const arr = input.split(",").map(Number);
  const n = arr.length;
  let lis = [];
  let steps = [];

  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  }

  for (let i = 0; i < n; i++) {
    let pos = binarySearch(lis, arr[i]);
    if (pos === lis.length) lis.push(arr[i]);
    else lis[pos] = arr[i];
    steps.push(`LIS sau bước ${i + 1}: ${lis.join(", ")}`);
  }

  document.getElementById(
    "result"
  ).textContent = `Dãy con tăng dài nhất có độ dài: ${lis.length}`;
  steps.forEach((step) => {
    const p = document.createElement("p");
    p.textContent = step;
    document.getElementById("result").appendChild(p);
  });
}
function lisBruteForce(arr) {
  function isIncreasing(subarr) {
    for (let i = 1; i < subarr.length; i++) {
      if (subarr[i] <= subarr[i - 1]) return false;
    }
    return true;
  }
  function generateSubsequences(index, subarr) {
    if (index === arr.length) {
      return isIncreasing(subarr) ? subarr.length : 0;
    }
    return Math.max(
      generateSubsequences(index + 1, subarr),
      generateSubsequences(index + 1, [...subarr, arr[index]])
    );
  }
  return generateSubsequences(0, []);
}

function lisDP(arr) {
  let n = arr.length;
  let dp = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}

function lisBinarySearch(arr) {
  let lis = [];
  for (let num of arr) {
    let pos = lis.findIndex((x) => x >= num);
    if (pos === -1) {
      lis.push(num);
    } else {
      lis[pos] = num;
    }
  }
  return lis.length;
}

function runAlgorithm(method) {
  let input = document.getElementById("inputArray").value;
  let arr = input
    .split(",")
    .map(Number)
    .filter((x) => !isNaN(x));
  if (arr.length === 0) {
    document.getElementById("result").innerText =
      "Vui lòng nhập dãy số hợp lệ.";
    return;
  }

  let result;
  switch (method) {
    case "brute":
      if (arr.length > 20) {
        result = "Dãy số quá lớn, không thể chạy vét cạn!";
      } else {
        result = "Độ dài LIS: " + lisBruteForce(arr);
      }
      break;
    case "dp":
      result = "Độ dài LIS: " + lisDP(arr);
      break;
    case "binary":
      result = "Độ dài LIS: " + lisBinarySearch(arr);
      break;
  }
  document.getElementById("result").innerText = result;
}
