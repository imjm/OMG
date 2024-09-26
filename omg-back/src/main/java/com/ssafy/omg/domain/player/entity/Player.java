package com.ssafy.omg.domain.player.entity;

import com.ssafy.omg.config.baseresponse.BaseException;
import lombok.*;

import static com.ssafy.omg.config.baseresponse.BaseResponseStatus.AMOUNT_EXCEED_CASH;
import static com.ssafy.omg.config.baseresponse.BaseResponseStatus.AMOUNT_EXCEED_DEBT;

/**
 * 플레이어 정보
 * - 대출 유무, 대출금,이자율, 현금, 금괴개수, 보유 주식, 플레이어 좌표(x, y, z),
 * - 플레이어 행위(무슨 행동을 하는지), 플레이어 행위 종료 상태, 플레이어 접속 상태, 한 행위 시간
 */
@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Player {
    private String nickname;           // 플레이어 닉네임

    private int characterType;
    private double[] position = new double[3];         // 플레이어 좌표(x, y, z)
    private double[] direction = new double[3];        // 플레이어 방향

    private int hasLoan;               // 대출 유무
    private int loanPrincipal;         // 대출원금
    private int loanInterest;          // 이자
    private int totalDebt;             // 갚아야 할 금액
    private int cash;                  // 현금
    private int[] stock = new int[6];  // 보유 주식 개수
    private int goldOwned;             // 보유 금괴 개수

    private PlayerAction action;       // 플레이어 행위 (주식 매수, 주식 매도, 금괴 매입, 대출, 상환)
    private PlayerStatus state;        // 플레이어 행위 상태 (시작전, 진행중, 완료)
    private int isConnected;           // 플레이어 접속 상태 (0: 끊김, 1: 연결됨)

    public void addCash(int amount) {
        this.cash += amount;
    }

    public void repayLoan(int amount) throws BaseException {
        if (amount > this.totalDebt) {
            throw new BaseException(AMOUNT_EXCEED_DEBT);
        }
        if (amount > this.cash) {
            throw new BaseException(AMOUNT_EXCEED_CASH);
        }

        this.totalDebt -= amount;
        this.cash -= amount;
    }
}
