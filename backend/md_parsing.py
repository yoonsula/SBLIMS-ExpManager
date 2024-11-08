import re

# markdown 파일 열기
def parse_markdown_headers(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # 헤더2와 헤더3 패턴 정의
    header2_pattern = re.compile(r'^##\s+(.*)')
    header3_pattern = re.compile(r'^###\s+(.*)')

    header_structure = {}
    current_header2 = None

    # 파일의 각 라인에서 패턴 매칭
    for line in lines:
        header2_match = header2_pattern.match(line)
        header3_match = header3_pattern.match(line)

        if header2_match:
            current_header2 = header2_match.group(1)
            header_structure[current_header2] = []
        elif header3_match:
            if current_header2:
                header_structure[current_header2].append(header3_match.group(1))
            else:
                # header2 없이 header3가 나왔을 때
                header_structure["Workflow not created"] = header_structure.get("Workflow not created", []) + [header3_match.group(1)]

    return header_structure

# header_structure = parse_markdown_headers('/data/ysla/projTask_241004/backend/uploaded_files/task_16/protein2.md')
# for wfName, uo_list in header_structure.items():
#     print("wfName:", wfName)
#     for uoName in uo_list:
#         print("uoName:",uoName)    
# for i, (a, b_list) in enumerate(rst.items()):
#     idx.append(i)
#     print(f"Index: {i}, a: {a}, b:{b_list}")
#     # workflow db에는 workflow name만 적어주면됨
#     # unit operation db에는 workflow name과 unit operation name을 적어줘야됨.
#     wf_name.append(a)
#     uo_name.append(b_list)
    
# print("index: ", idx[0], "wf_name: ",wf_name[0], "uo_name: ", [uo_name[0][i] for i in range(len(uo_name[0]))])

