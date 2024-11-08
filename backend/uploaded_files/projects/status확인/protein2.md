### Objectiv

-   Constructing MPH mutants with multiple mutations with biofoundry facility
hello

### PCR for introducing a mutation

#### 2024.04.12

### Materials

-   0.2ml 8-Strip and Individual PCR Tubes
-   KOD OneTM PCR Master Mix(KMM-101)
-   Distilled water
-   Primer(100pmol/ul)-\>Non-Overlapping primers

#### Sample info
-   M150L MPH (기존 만들어진 mutant, `OLD_README.md` 참고), 어디 Stock, ..., Sequence 정보...
-   제작할 mutants
    -   M150L-F112L    
    -   M150L-A78E
    -   M150L-M43I
    -   M150L-G117A
    -   M150L-T91S
    -   M150L-A28G
    -   M150L-D63A
-   사용한 primer list (https://github.com/sblabkribb/proteinengineering_DmpR/blob/main/paper_draft/Supplementary_Data/Primer_list.xlsx)
    -   n_G117A_R ACCGAACAGACCCGCCGC
    -   n_F112L_R GGTCGTCTGGCGGCGAAC
    -   n_D63A_R CGCAACGGTACCGTCAGA
    -   n_A78E_R TGGGTTTTCGGCGCCGGC
    -   n_A28G_F GTTCGTACCTCTGCGCCGG
    -   n_V90F_F GTTAACACCGGTTCTAAA
    -   n_T91S_R TTCCAGCGGCGCTTTCTG
    -   n_M43I_F CCGGCGCAGAGGTACGAAC
    -   G117A_F CCGACCCTGGCTCGTCTGGCGGCG
    -   F112L_F GCGGGTCTGTTGGGTCCGACCCTG
    -   D63A_F CTGCCGGTTGCCAAACGTCTGAAC
    -   A78E_F GTCTGCGCTGGAGAAATCTTTCCAG
    -   A28G_R CTGCGGCGCCGCCCCAGACGCGTG
    -   V90F_R CAGGTAACCGGTAAAAGAGGTTTC
    -   T91S_F ACCTCTGTTAGCGGTTACCTGGTT
    -   M43I_R GTCACCCAGCAGAATACGGTAGTAAC
-   Echo 사용시 각 프라이머/샘플의 전처리 및 상세 볼륨 필요

#### Equipment

-   C1000 Series Touch Thermal Cyclers

#### Method

-   M150L 1 round mutant를 template로 사용
-   Sample수 만큼 PCR tube에 KOD mixer와 DW, Template을 나눠 분주합니다.

<mutant PCR component>

| component            | volume |
|----------------------|--------|
| 10pmol/ul F,R primer | 0.5ul  |
| KOD mix              | 12.5ul |
| Template             | 1ul    |
| DW                   | 10.5ul |
| Total                | 25ul   |

-   Centrifuge를 이용해 약 5초동안 spin down 시킨다.

-   C1000 Series Touch Thermal Cyclers 에 아래와 같이 설정하고 plate를 넣어준다.

| Steps | temperature | time                        | description          |
|-------|-------------|-----------------------------|----------------------|
| 1     | 98℃         | 5min                        | initial denaturation |
| 2     | 98℃         | 10sec                       | denaturation         |
| 3     | 55℃         | 10sec                       | annealing            |
| 4     | 68℃         | 1min 30sec Go to 2step(x29) | extension            |
| 5     | 68℃         | 5min                        | final extension      |
| 6     | 4℃          | \~                          |                      |

-   PCR reaction이 끝난 뒤, 5ul는 따로 빼서 tube에 보관한다. (gel electrophoresis용)

## MPH Single Directly Mutation Round 2
### AMPure 활용한 PCR purification

#### Materials

-   Agencourt AMPure XP beads (Beckman Coulter™, A63881)
-   70\~80% Ethanol

#### Equipment

-   96 Well Magnetic rack PCR plate 0.2ml
-   0.2ml 8-Strip and Individual PCR Tubes
-   Vertexer
-   Mini Centrifuge(0.2ml PCR tube)

#### Samples

-   앞 단계에서 만들어진 Single Mutation PCR product 20ul per PCR tube

#### Methods

-   앞 단계의 PCR이 끝난 PCR tube에 20ul magnetic bead 넣는다.

-   Tube를 짧게 vortexing후, 약 3초동안 centrifuge시킨다.(많이 centrifuge시키면 bead들이 전부 가라앉아 층을 형성하며 효율 낮아짐)
-   5분동안 room temperature에서 incubation시킨다.

-   magnetic rack을 tube 아래에 위치함으로 bead가 well의 벽에 붙는 것을 확인한다.

-   supernatant를 tip을 이용해 제거한다. (bead가 딸려오지 않도록 주의)

-   100ul ethonl을 tube에 넣고, 바로 ethanol을 제거한다. (2번 반복) 그리고 약 2분동안 tube의 뚜껑을 열고 환기 시켜준다.
    -   ethnol 농도는 70-80%이다.
    -   ethnol을 제거할때, tip을 tube의 바닥에 닿도록 위치시키고, 뽑아준다.
    -   이 과정동안 tube는 magnetic에 계속 고정시킨 상태이다.
    -   마지막 Washing 단계에서 낮은 volume의 pipette을 이용하여 최대한 supernatant를 제거한다.

-   위 tube에 20ul DW를 넣고 votexing후 3초간 centrifuge, 10분동안 incubation(상온, 10분)

-   tube를 magnet으로 옮기고 상등액(DNA)을 뽑아준다
