/**
    Question
The current selected programming language is Java. We emphasize the submission of a fully working code over partially correct but efficient code. Once submitted, you cannot review this problem again. You can use System.out.println()to debug your code. The System.out. printin()may not work in case of syntax/runtime error. The version of JDK being used is 1.8。
Note: The main class name must be "Solution".
注意：主类名必须是“Solution”。

Mary, a physical education teacher, divides her students into different groups and assigns an ID to each group. For the group ID, she asks the students to stand in a queue. Each student in the class has a performance factor(PFR). She assigns scores to the students in an unusual way based on their PFR. She gives a score of 5 to a student behind whom is standing at least one student with a higher PFR, behind whom is standing at least one student with a smaller PFR. Next, she gives a score of 10 to a student behind whom is standing a student with a higher PFR, behind whom no student with smaller PFR is standing. Finally, she gives a score of 15 to a student behind whom is standing no student with a higher PFR. The group ID is the sum of scores of the students in the group. 
Write an algorithm to find the group ID of a group of students.

玛丽是一名体育教师，她将学生分成不同的小组，并为每个小组分配一个ID。对于组ID，她要求学生们排队。班上的每个学生都有一个绩效因子（PFR）。她根据学生的PFR以一种不同寻常的方式给他们打分。她给一个学生打5分，这个学生身后站着至少一个PFR较高的学生，而这个学生身后至少站着一个PFL较小的学生。接下来，她给身后站着PFR较高的学生的学生打10分，身后没有PFR较小的学生。最后，她给一个没有PFR更高的学生的学生打了15分。组ID是组中学生的分数之和。
编写一个算法来查找一组学生的组ID。

Input
The first line of the input consists of an integer num, representing the number of students in a group. The second line consists of N space-separated integers - listPFR[O], listPFR[1].........listPFR[N-1]representing the PFR of the students in the order in which they are standing in the queue.
输入的第一行由一个整数num组成，表示一个小组中的学生人数。
第二行由N个空格分隔的整数组成  listPFR[0]  listPFR[1]…..，listPFR[N-1]代表以下学生的PFR他们排队的顺序
Output
Print an integer representing the group ID of the group of students.
打印一个整数，表示学生组的ID组。
constraints
1 ≤ num ≤ 10^5
-10^9≤ liscPFRO. listPFRI1........../istPFRIN-1≤10^9

EXample
input
6
145278
Output:
55

Explanation:
The student with a PFR 1 has a student with a PFR 4 next to him/her, and a student with a PFR 2 is standing behind the a higher PFR student. So, Mary gives a score of 5 to the first student.
Similarly, a score of 5 has been granted to the student with the PFR4. The student with a PFR 5 has a student with a PFR 7 standing behind him/her and there is no student with a smaller PFR
standing behind that higher PFR student. So, Mary gives a score of 10 to the student with PFR 5。Similarly, she gives a score of 10 to the students with the PFR 2 and 7. The student with a PFR 8 does not have any higher PFR student behind him/her. So, Mary assigns this student a score of 15。Thus, the group ID=55(5+5+10+10+10+15). So, the output is 55。
PFR 1的学生旁边有一个PFR 4的学生，PFR 2的学生站在PFR较高的学生后面。所以，玛丽给第一个学生打了5分。
同样，PFR4的学生也获得了5分。PFR 5的学生身后站着一个PFR 7的学生，没有PFR较小的学生
站在那位PFR较高的学生身后。因此，玛丽给PFR为5的学生打了10分同样，她给PFR 2和7的学生打10分。PFR 8的学生身后没有更高的PFR学生。所以，玛丽给这个学生打了15分因此，组ID=55（5+5+10+10+10+15）。因此，输出为55
 */


/**
1. 问题分析：

    * 每个学生的得分取决于其后面学生的PFR情况
    * 需要检查每个学生后面是否存在更高的PFR，以及更高PFR后面是否存在更小的PFR

2. 评分规则：

    * 得分5：后面有更高PFR学生，且更高PFR学生后面有更小PFR学生
    * 得分10：后面有更高PFR学生，但更高PFR学生后面没有更小PFR学生
    * 得分15：后面没有更高PFR学生

3. 算法选择：

    * 对于每个学生，向后遍历检查PFR情况
    * 使用标志位记录是否找到符合条件的更高/更小PFR
 */

/**
 * 计算小组ID
 * @param {number} num - 学生数量
 * @param {number[]} listPFR - 学生PFR数组
 * @return {number} - 小组ID
 */
function calculateGroupID(num, listPFR) {
    let groupID = 0;
    
    for (let i = 0; i < num; i++) {
        const currentPFR = listPFR[i];
        let hasHigher = false;
        let hasSmallerAfterHigher = false;
        
        // 检查后面是否有更高PFR
        for (let j = i + 1; j < num; j++) {
            if (listPFR[j] > currentPFR) {
                hasHigher = true;
                // 检查更高PFR后面是否有更小PFR
                for (let k = j + 1; k < num; k++) {
                    if (listPFR[k] < listPFR[j]) {
                        hasSmallerAfterHigher = true;
                        break;
                    }
                }
                break; // 只需找到第一个更高PFR
            }
        }
        
        // 根据规则计算得分
        if (!hasHigher) {
            groupID += 15;
        } else if (hasSmallerAfterHigher) {
            groupID += 5;
        } else {
            groupID += 10;
        }
    }
    
    return groupID;
}

// 测试用例
console.log(calculateGroupID(6, [1, 4, 5, 2, 7, 8])); // 输出55
console.log(calculateGroupID(3, [5, 3, 4])); // 输出40 (15+10+15)
console.log(calculateGroupID(7, [1, 2, 3, 4, 5, 6, 7])); // 输出75 (10 * 6 + 15)
console.log(calculateGroupID(3, [5, 3, 1])); // 输出45 (15+15+15)
console.log(calculateGroupID(4, [2, 2, 2, 2])); // 输出60 (15*4)
console.log(calculateGroupID(5, [10, 9, 8, 7, 6])); // 输出75 (15*5)