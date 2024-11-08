## Spacer_connection

#### 목표

-   Spacer VA1을 교체하고 몇개 까지 붙는지 확인

-   확인된 정보를 바탕으로 mva pathway 제작 (GG1, GG2)

-   2개의 조각에 대한 정보

    -   GG1: Lycopene operon, IspA, MvaK1, MvaD

    -   GG2: MvaK2, Idi, MvaE, MvaS

### \[Liquid handling\] Golden Gate assembly mixture 제작

#### 20240530

#### 시약

-   DNA parts (promoter, RBS, CDS, terminator, spacer)

-   DW

-   T4 DNA ligase (HC) (Promega)

-   BsaI restriction enzyme (NEB)

-   10x T4 DNA ligase buffer (Promega)

#### 소모품

-   Pipet tip (10p, 200p tip)

-   PCR tube

-   PCR tube rack

#### 장비

-   Pipet (10p, 2.5p, 200p)

-   freezer

#### 방법

-   대량 자동화 수행 시, Janus, Echo 525 를 위한 추가적인 프로토콜이 필요함
-   농도가 측정된 파트들을 계산하여 10 nM (100 fmol/10 $\mu l$ ) 이상이 되도록 함 (volume은 10 $\mu l$ 로 맞춤)
-   볼륨을 맞추기 위해 DW를 넣어줌
-   10x ligase buffer와 ligase, restriction enzyme을 넣음
    -   많은 양을 제작할 때는 stock으로 만든 후 소분
-   실험에 사용된 부품과 양은 Assembly_023.xlsx의 240530 sheet를 참고

![](images/paste-1.png)

#### 결과물

-   Golden Gate assembly를 위한 module assembly mixture 2 종

### \[Thermocycling\] Thermocycler를 이용한 Golden Gate assembly 진행 (part 간 assembly)

#### 시약

-   Golden Gate assembly를 위한 module assembly mixture 2 종

#### 장비

-   Thermocycler (Bio-rad)

#### 방법

-   part mixture를 홈에 맞춰 Thermocycler에 넣음

-   뚜껑을 닫고 조임

-   Golden Gate assembly 조건에 맞추어 작동

| Steps | temperature | time                  | description                     |
|------------------|------------------|------------------|-------------------|
| 1     | 37℃         | 10min                 | initial restriction             |
| 2     | 37℃         | 5min                  | restriction                     |
| 3     | 16℃         | 5min Go to 2step(x59) | ligation                        |
| 4     | 75℃         | 5min                  | ligase inactivation             |
| 5     | 80℃         | 10min                 | restriction enzyme inactivation |
| 6     | 4℃          | \~                    |                                 |

-   Golden Gate assembly 반응이 끝난 뒤 샘플을 냉동고에 보관

#### 결과물

-   Golden Gate assembly product (module) 2종 -10 $\mu L$ PCR tube

### \[Liquid handling\] PCR mixture 제작 (KODone mastermix)

#### 20240531

#### 시약

-   KOD one polymerase master mix (2x) (toyobo)

-   primer 쌍 (<https://github.com/sblabkribb/mvaopt/blob/feature/vector_script/labnote/014_Gene_assembly_with_spacer/resource/Spacer_sequence.xlsx> Spacer_PCR, Spacer-Goldengate 참고)

    -   VA16_F, VA6_R

    -   VA6_F, VA2_Redit

    -   VA16_F\_GG, VA6_R\_GG

    -   VA6_F\_GG, VA2_R\_GG

-   Template DNA (Golden Gate assembly product (module) 2종 )

-   DW

#### 소모품

-   PCR tube

#### 장비

-   vortexor

-   원심분리기

-   Pipets and tips (1000 p, 100 p, 10 p, 2.5 p)

#### 방법

-   냉동고에서 master mix를 꺼내어 녹임

    -   Ice에 담아서 녹이거나 상온에서 녹임

-   Sample수 만큼 PCR tube에 KOD mixer와 DW, Template을 나눠 분주

<PCR component>

| component             | volume |
|-----------------------|--------|
| 100pmol/ul F,R primer | 0.2ul  |
| 2x KOD mastermix      | 25ul   |
| Template              | 0.6ul  |
| DW                    | 24ul   |
| Total                 | 50ul   |

-   Centrifuge를 이용해 약 5초동안 spin down

#### 결과물

-   Golden Gate assembly 를 위한 module 9종 - 50 $\mu l$ PCR tube

### \[Thermocycling\] Thermocycler를 이용한 PCR 진행

#### 시약

-   Golden Gate assembly 를 위한 module 9종

#### 장비

-   Thermocycler (Bio-rad)

#### 방법

-   part mixture를 홈에 맞춰 Thermocycler에 넣음

-   뚜껑을 닫고 조임

-   Gibson assembly 조건에 맞추어 작동

<!-- -->

-   Thermal Cyclers 에 아래와 같이 설정하고 PCR tube를 넣음

| Steps | temperature | time                      | description          |
|-------|-------------|---------------------------|----------------------|
| 1     | 98℃         | 5min                      | initial denaturation |
| 2     | 98℃         | 10sec                     | denaturation         |
| 3     | 55℃         | 10sec                     | annealing            |
| 4     | 68℃         | 1:20 min Go to 2step(x30) | extension            |
| 5     | 68℃         | 2min                      | final extension      |
| 6     | 4℃          | \~                        |                      |

-   PCR reaction이 끝난 뒤, 5ul는 따로 빼서 tube에 보관 (gel electrophoresis용)
-   주문한 primer는 vortexing 후 spin down을 진행하고 DW를 넣어준 후 반복하여 제작

#### 결과물

-   Ampilified 된 module product 4 종 -50 $\mu L$ PCR tube

### \[Purification\] DNA purification (Cosmo)

#### 시약

-   Promega gel extraction kit

    -   column

    -   membrane binding solution

    -   washing solution

    -   tube

-   DNA product (Ampilified 된 module product 4 종)

-   DW

#### 소모품

-   EP tube
-   Pipet tips (1000p, 100p, (optional 200p))

#### 장비

-   원심분리기

-   vortexor

-   waste를 버릴 bottle

-   Pipet, (1000p, 100p, (optional 200p))

#### 방법

-   정제할 DNA product의 5배 부피의 membrane binding solution ( $\mu l$ )를 DNA product에 넣고 혼합

    -   정확하게 같지 않아도 되나, binding solution의 부피가 더 커야 함

    -   넣은 뒤 vortexing을 통해 잘 섞이도록 함

    -   PCR tube에 담겨있는 product의 경우 150 $\mu l$ 를 넣은 후 진행함

-   원심분리기로 spindown 하며 액체를 모아 준 후, column에 옮겨줌

    -   너무 양이 많을 경우 (1 ml 이상) 나눠서 옮김

-   상온에서 1분정도 두어 membrane에 충분히 용액이 잠기도록 한 뒤, 원심분리 진행

    -   1분, 12,000 rpm 이상에서 진행함

-   column 아래로 내려간 용액을 버리고 다시 조립한 후, washing solution 750 ul를 넣고 원심분리

    -   1분, 12,000 rpm 이상에서 진행

-   column 아래로 내려간 용액을 버리고 다시 조립한 후, 원심분리

    -   2분, 12,000 rpm 이상에서 진행

-   column을 깨끗한 EPtube로 옮기고 DW를 넣은 뒤 상온에서 1분 이상 방치

    -   DW는 column 가운데로 넣어 모두 잠기도록 함

    -   팁 끝이 column에 닿지 않도록 주의

    -   넣어주는 DW의 양은 40\~100 $\mu l$ 로 설정하며, 40 $\mu l$를 넣음

-   원심분리 후, column을 제거하고 EP tube의 뚜껑을 닫는다

    -   2분, 12,000 rpm 이상에서 진행

#### 결과물

-   Primer나 작은 DNA fragment가 제거된 Assembly 용 모듈 4종 -40 $\mu L$ EP tube

### \[DNA quantification\] DNA concentration measuring (Qubit)

#### 시약

-   Qubit buffer
-   standard solution #1, #2
-   DNA sample (Primer나 작은 DNA fragment가 제거된 assembly 용 모듈 4종)

#### 소모품

-   500 $\mu l$ tube
-   Pipet tips (200 p, 10p, 2.5p)

#### 장비

-   Qubit 장비

-   vortexor

-   pipets (200p, 10p, 2.5p)

#### 방법

-   Qubit buffer를 500 $\mu l$ tube에 옮김
    -   standard를 넣을 tube 2개는 190 $\mu l$ , 샘플을 담을 tube에는 198\~199 $\mu l$를 옮김
-   Standard solution 및 DNA 샘플을 Qubit buffer에 각각 혼합
    -   standard #1, #2를 각각 10 $\mu l$ 씩, DNA sample을 넣어 도합 200 $\mu l$가 되도록 넣는다
-   vortexing 후 상온에서 2분 정도 방치
    -   기포가 발생하지 않도록 잘 털어줌
-   장비의 전원을 켜고 농도 측정
    -   1s DNA sensitivity로 전환
    -   standard 설정
    -   샘플 #1, #2를 차례대로 넣어줌
    -   넣어준 샘플의 양을 지정 (1\~2 $\mu l$)
    -   loading 하여 농도를 측정

#### 결과물

-   농도를 알게 된 정제된 assembly 용 모듈 4종 -40 $\mu L$ EP tube

### \[Electrophoresis\] 전기영동으로 크기 확인

#### 시약

-   Bluejuise dye (10x)

-   1 kb DNA ladder (with bluejuice)

-   DNA sample (농도를 알게 된 정제된 assembly 용 모듈 4종)

-   TAE

-   1% Agar

#### 소모품

-   PCR tube

-   pipet tips (10 p, 2.5 p)

-   kim wipe

#### 장비

-   Pipet (10 p, 2.5 p)

-   전기영동 장치

-   agarose 틀

-   comb

-   oven (50도)

-   PCR tube 용 spin downer

-   Vortexer

-   Blue light illuminator

#### 방법

-   agarose gel 틀에 17 well comb을 넣고 50도 오븐에서 보관되고 있던 1% agarose gel을 부어 굳힘. 20분정도면 완성됨

-   DNA product를 9 $\mu l$ 덜어내어 PCR tube에 담음

-   bluejuice dye를 1 $\mu l$ 를 DNA product가 든 PCR tube에 담고 섞음

-   spin down을 3초 정도 줘서 샘플을 준비한다

-   굳은 gel의 comb을 떼어내고, 틀 주변에 굳은 agarose gel 조각을 제거하고 틀과 함께 TAE가 든 전기영동 장치에 바른 방향으로 넣음

-   DNA product와 bluejuice dye가 섞인 혼합액을 10 $\mu l$ loading 함

-   1 kb DNA ladder 5 $\mu l$ 를 양 끝쪽에 loading 함

-   전기영동 장치의 뚜껑을 닫고 전기영동을 진행함 (135 V, 20 min)

-   전기영동이 끝난 샘플을 kim wipe를 통해 주변의 물기를 제거하고 Blue light illuminator로 DNA 밴드를 확인함

#### 결과물

-   DNA 크기와 농도를 알게 된 정제된 assembly 용 모듈 4종

### \[Liquid handling\] Gibson assembly mixture 제작

#### 시약

-   2x Gibson assembly mastermix (NEB)

-   크기와 농도를 알게 된 정제된 PCR product (GG1, GG2, vector)

-   DW (optional)

#### 소모품

-   PCR tube
-   Pipet tips (10p, 2.5 p)

#### 장비

-   vortexor

-   pipets and tips (200p, 10p, 2.5p)

#### 방법

-   DNA product를 몰 수에 맞게 혼합 (240530 sheet 참고)

    ![](images/paste-2.png)

    -   2x gibson assembly mix 5 $\mu l$를 넣어 gibson assembly 진행
    -   최종 볼륨 10 $\mu l$ 가 되도록 설정

#### 결과물

-   Gibson assembly를 위한 module mixture -10 $\mu l$ PCR tube

### \[Thermocycling\] Thermocycler를 이용한 Gibson assembly 진행

#### 시약

-   Gibson assembly 를 위해 제작한 module mixture 종

#### 장비

-   Thermocycler (Bio-rad)

#### 방법

-   part mixture를 홈에 맞춰 Thermocycler에 넣음

-   뚜껑을 닫고 조임

-   Gibson assembly 조건에 맞추어 작동

| Steps | temperature | time  | description      |
|-------|-------------|-------|------------------|
| 1     | 37℃         | 50min | initial reaction |
| 2     | 50℃         | 5h    | reaction         |
| 3     | 4℃          | \~    |                  |

-   Gibson assembly 반응이 끝난 뒤 샘플을 냉동고에 보관

#### 결과물

-   MVA pathway가 모두 들어간 gibson assembly product -10 $\mu L$ PCR tube

### \[Liquid handling\] Transformation 을 위한 DNA, Compentent cell 분주

#### 20240601

#### 시약

-   DNA plasmid (MVA pathway가 모두 들어간 gibson assembly product)

-   DH5$\alpha$ competent cell

#### 소모품

-   EP tube

-   Pipet tips (200 p, 10 p)

-   ice

#### 장비

-   Ice basket in Ice

-   deep freezer

#### 방법

-   deep freezer에서 분주된 competent cell을 가지고 와서 녹임

-   적당한 수로 나눈 후 DNA product (plasmid)를 competent cell 볼륨의 1/10 이하로 넣음

    -   100 $\mu l$ 로 나눈 후 5 $\mu l$ product 넣음

-   ice에서 30분 간 배양

#### 결과물

-   DNA product가 들어간 competent cell in EP tube

### \[Thermocycling\] Transformation-Heat-shock

#### 시약

-   DNA product가 들어간 competent cell in EP tube

#### 소모품

-   Ice

#### 장비

-   Water bath in water

-   floater (둥둥이)

-   Ice basket in Ice

#### 방법

-   42도로 예열된 water bath에 배양한 competent cell을 둥둥이에 끼워 뜰 수 있게 한 후 42도에서 90초간 heat-shock

-   다시 ice에서 2\~3분간 배양

#### 결과물

-   Heat-shock이 끝난 competent cell+DNA product in EP tube

### \[Liquid handling\] Transformation을 위한 Recovery

#### 시약

-   Heat-shock이 끝난 competent cell+DNA product in EP tube

-   SOC media

#### 소모품

-   Pipet tips (1000p, 200 p, 10 p)

#### 장비

-   Clean bench

-   incubator (37도)

-   Pipet

#### 방법

-   SOC를 넣어 cell이 잘 자랄 수 있도록 함. 최대 볼륨은 (competent cell+SOC) 1 ml 임

    -   100 $\mu l$ 의 SOC를 넣어 줌

-   37도 incubator에서 45분간 recovery 진행

#### 결과물

-   SOC를 넣어 recovery가 된 competent cell + DNA product in EP tube

### \[Spotting/Spreading\] Transformation을 위한 고체 배지 spotting/spreading

#### 시약

-   SOC를 넣어 recovery가 된 competent cell + DNA product

-   LB plate with appropriate antibiotics

#### 소모품

-   Pipet tips (200 p, 10 p)

-   spreader

#### 장비

-   Clean bench

-   incubator (37도)

-   Pipet

#### 방법

-   적절한 항생제가 든 plate에 200 $\mu l$ 정도 transforment를 넣은 뒤, spreader로 물기가 사라질 때까지 spreading

    -   liquid hander를 이용해 4 $\mu l$ 씩 spotting (spotting의 경우)

-   LB plate를 뒤집어서 37도 incubator에서 밤새 배양

    -   Spotting의 경우 뒤집지 않고 바로 배양

### \[Liquid handling\] Colony PCR을 위한 mixture 제작

#### 20240603

#### 시약

-   DNA polymerase mixture (KOD one mixture)

-   DW

-   primer

    -   Vector_spacer_check_F, Vector_spacer_check_R

-   Colony가 있는 plate

-   Colony가 없는 plate

#### 소모품

-   PCR tube

-   EP tube

-   Pipet tips (200 p, 2.5 p)

#### 장비

-   Pipet (200 p, 2.5 p)

-   spin down 장비

-   Clean bench

-   vortexor

-   Incubator

#### 방법

-   냉동고에서 master mix를 꺼내어 녹임

    -   Ice에 담아서 녹이거나 상온에서 녹임

-   Sample수 만큼 PCR tube에 KOD mixer와 DW, Template을 나눠 분주

<PCR component>

| component             | volume |
|-----------------------|--------|
| 100pmol/ul F,R primer | 2ul    |
| 2x KOD mastermix      | 100ul  |
| Template              | 0ul    |
| DW                    | 96ul   |
| Total                 | 200ul  |

-   PCR tube에 10 $\mu l$ 씩 분주
-   Centrifuge를 이용해 약 5초동안 spin down
-   클린벤치에서 팁을 이용하여 콜로니를 집은 후, 콜로니가 없는 plate에 살짝 긁어내어 master plate를 제작하면서, 긁었던 팁을 분주한 PCR tube에 넣음
-   총 16개 제작
-   만들어진 master plate는 37도에 배양함

#### 결과물

-   Colony PCR를 위한 PCR mixture 16종 - 10 $\mu l$ PCR tube

### \[Thermocycling\] Thermocycler를 이용한 PCR 진행

#### 시약

-   Colony PCR를 위한 PCR mixture 16종 - 10 $\mu l$ PCR tube

#### 장비

-   Thermocycler (Bio-rad)

#### 방법

-   part mixture를 홈에 맞춰 Thermocycler에 넣음

-   뚜껑을 닫고 조임

-   Gibson assembly 조건에 맞추어 작동

<!-- -->

-   Thermal Cyclers 에 아래와 같이 설정하고 PCR tube를 넣음

| Steps | temperature | time                      | description          |
|-------|-------------|---------------------------|----------------------|
| 1     | 98℃         | 5min                      | initial denaturation |
| 2     | 98℃         | 10sec                     | denaturation         |
| 3     | 55℃         | 10sec                     | annealing            |
| 4     | 68℃         | 1:20 min Go to 2step(x30) | extension            |
| 5     | 68℃         | 3min                      | final extension      |
| 6     | 4℃          | \~                        |                      |

-   주문한 primer는 vortexing 후 spin down을 진행하고 DW를 넣어준 후 spin down하여 제작

#### 결과물

-   Ampilified 된 colony PCR product 16 종 -10 $\mu L$ PCR tube

### \[Electrophoresis\] 전기영동을 통한 DNA 밴드 크기 확인

#### 시약

-   Ampilified 된 colony PCR product 16 종 -10 $\mu L$ PCR tube

-   10x Bluejuice dye

-   Ladder with dye

-   1% agarose gel (50도 보관)

#### 소모품

-   Pipet tips (white)

-   PCR tube (optional)

-   kim wipes

#### 장비

-   전기영동 장치

-   vortextor

-   agarose gel 제작용 틀 (comb 포함)

-   dry oven (50도 유지)

-   illuminator

#### 방법

-   50도로 유지된 dry oven에서 agarose gel 용액을 꺼내 틀에 부은 후 확인에 알맞은 comb을 끼움

-   20\~30분 정도 상온에 두어 굳힘

    -   주변의 기포를 제거함

-   Ampilified 된 colony PCR product 16 종 -10 $\mu l$ 에 10x Bluejuice dye 1 $\mu l$ 를 넣고 vortexing 후 spindown

-   전기영동 장치의 뚜껑을 열고, 제작한 gel을 넣고 홈에 염색된 DNA product와 ladder를 loading

-   뚜껑을 닫고, 100V, 20 분 정도로 설정하여 전기영동 진행

-   gel을 꺼낸 후 kim wipes로 물기를 제거한 후, illuminator를 통해 DNA 밴드를 관찰

#### 결과물

-   Colony PCR을 진행하여 cloning 결과를 확인한 콜로니

### \[Liquid handling\] DNA miniprep을 위한 액체배양

#### 시약

-   LB 배지

-   master plate

-   항생제 (chlormphenicol) stock

#### 소모품

-   Pipet aid tip (10ml)

-   Pipet tip (20 p)

-   14 ml round bottom tube

#### 장비

-   Clean bench

-   Pipet aid

-   Shaking incubator

-   14 ml round bottom rack

#### 방법

-   클린 벤치에서 14 ml round tube를 나눠 담음

-   LB 배지를 pipet aid로 9 ml 씩 분주함 (2개만)

-   항생제 stock 9 $\mu l$ 를 LB 배지 넣은 곳에 넣음

-   Pipet aid로 섞은 후 3 ml 씩 다른 14 ml round bottom tube에 분주 (3 ml LB+항생제가 분주된 14 ml round bottom tube 6개)

-   크기가 확인된 콜로니를 마스터 플래이트에서 골라 팁으로 콜로니를 살짝 긁은 후 팁과 함께 14 ml round bottom tube에 넣어 접종

-   37도 Shaking incubator에 넣어 밤새 배양

#### 결과물

-   miniprep을 위한 배양액

### \[DNA miniprep\] 서열 분석을 위한 plasmid 추출

#### 240604

#### 시약

-   miniprep kit (cosmo)

-   Plasmid mini-prep kit (promega)

    -   cell re-suspension buffer

    -   cell lysis buffer

    -   alkaline protease

    -   naturalization buffer

    -   washing buffer

    -   column

    -   tube

-   Cell culture

-   DW

#### 소모품

-   EPtube

-   paper towl

-   waste bottle

-   pipets and tips (1000p, 200p, 10p)

#### 장비

-   원심분리기

#### 방법

-   잘 키운 cell을 원심분리

    -   대게 14 ml round bottom tube에 3 ml 정도 배양하며, 적절한 항생제를 넣은 배지에서 배양함

    -   Overnight 배양한 샘플이 적당하나, 상황에 따라 덜 지난 것을 이용할 수 있음

    -   큰 원심분리기를 이용할 경우 4도, 3000 rpm, 10\~15분을 설정함

-   상층액을 제거하고 종이 타월로 물기를 제거함

-   cell re-suspension 250 $\mu l$ 를 넣고 pipetting 혹은 vortexing으로 충분히 섞어 줌

-   3의 용액을 EP tube에 각각 담음

-   cell lysis buffer 250 $\mu l$ 를 4에 넣고 inverting 8\~10번 진행 후 방치

    -   cell lysis buffer에 침전이 있을 경우 oven등을 이용하여 녹여줌 (저온일때)

    -   절대로 vortexing 하지 않음

    -   5분 정도 기다림

-   neutralization buffer 350 $\mu l$ 를 5에 넣고 inverting 8\~10회

    -   절대로 vortexing 하지 않음

    -   넣어 준 후 모든 샘플을 빠르게 inverting

    -   용액이 충분히 섞일 수 있도록 함

-   원심분리

    -   10분, 12,000 rpm 이상에서 진행함

    -   뚜껑 연결부위가 원심분리기 바깥을 향하게 넣어줌

-   column을 조립하고 7의 상층액을 모두 넣어 줌

    -   침전을 되도록 넣지 않도록 함

    -   7과정이 온도 유지가 되는 원심분리기라면 저온에서 돌렸을 때 좀 더 오래 섞이지 않음

    -   한번에 빨아올림 (pipetting 하면 침전과 섞일 가능성이 크다)

    -   되도록 많이 넣는 것이 좋으나 여건이 좋지 않을 때에는 침전을 최소화함

-   1분정도 상온에 둔 후, 원심 분리

    -   1분, 12,000 rpm 이상

-   column 아래로 내려간 액체를 버리고 washing solution 750 $\mu l$ 를 넣고 원심분리

    -   1분, 12,000 rpm 이상

-   column 아래로 내려간 액체를 버리고 원심분리

    -   2분, 12,000 rpm 이상

-   column을 깨끗한 EPtube로 옮기고 DW를 넣은 뒤 상온에서 1분 이상 방치

    -   DW는 column 가운데로 넣어 모두 잠기도록 함

    -   팁 끝이 column에 닿지 않도록 함

    -   넣어주는 DW의 양은 40\~100 $\mu l$ 로 설정하며, 50 $\mu l$ 를 설정

-   원심분리 후, column을 제거하고 EP tube의 뚜껑을 닫음

    -   2분, 12,000 rpm 이상에서 진행

-   서열 분석을 위해 깨끗한 EP tube에 20 $\mu l$ 의 DNA를 덜어내어 서열 분석을 진행함

    -   사용 프라이머

        |                       |                      |
        |-----------------------|----------------------|
        | vector_spacer_check_F | ttaatcagataaaatatttc |
        | vector_spacer_check_R | ttgttgctcaggtcgcagac |
        | Idi_R                 | gccaggccatgcttttttgc |
        | MvaK1_F               | tggcgcgaaaattaccggcg |
        | MvaD_F                | gatgctggtcccaatgttaa |
        | IspA_F                | cgatgatttctgaactggcg |
        | MvaE_R                | ccgtcattgcgggaatttca |

#### 결과물

-   서열 분석 결과가 끝난 Plasmid