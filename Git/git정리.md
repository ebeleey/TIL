# Day 3 정리

## Git

> Git 이란?   
> 분산 버전 관리 시스템

* Git은 3개의 영역이 존재
1. Working Directory
    + 현재 수정, 생성, 삭제된 파일들이 위치한 영역
    + `git status` 붉은 색으로 파일 명 표시
        + Untracked: 새로 생성된 파일을 의미
        + Modified: 수정된 파일을 의미
        + Deleted: 삭제된 파일을 의미
    + 해당 영역에 있는 파일은 commit에 기록되지 않음 (Staging Area로 이동 시켜야 함)
2. Staging Area
    + Aka. 분류소(버전 관리할 파일)
    + 버전 관리할 파일들을 모아두는 임시 영역
    + `git status`로 확인을 종종 할 필요가 있음
        + New File: 생성된 파일
        + Modified: 수정된 파일
3. Repository
    + 실제 버전 관리 내용이 저장되는 영역
    + `git log`을 이용하여 commit이력을 확인할 수 있음

### Git 기본 명령어
+ `git add 파일명`
    + Working Directory => Staging Area로 파일을 이동시키는 명령어
    + `git add .`: 현재 폴더의 모든 파일과 폴더를 Staging Area로 이동시킬 수 있음
        + 주의: 버전 관리가 필요없는 파일이나 폴더가 같이 올라갈 가능성이 있어 반드시 Staigng Area를 확인해야 함
+ `git commit`
    + 커밋 이력을 남기는 명령어
    + 반드시 커밋 메시지를 남겨야 함
    + `-m '메시지'`: 해당 옵션으로 간단한 커밋 메시지를 남길 수 있음
    > **(참고) Vim 에디터 간단 사용법**   
    > Vim은 두 가지 모드가 있음
    > 1. Command 모드: 저장, 나가기
    > 2. Editor 모드: 텍스트 수정   
    > * Editor 모드로 전환하는 방법은 키보드 i를 누르면 됨   
    > * Command 모드로 전환하는 방법은 esc 키   
    > * 저장하고 나가기: `:wq`   
    > * 저장하지 않고 강제로 나가기: `:q!`
