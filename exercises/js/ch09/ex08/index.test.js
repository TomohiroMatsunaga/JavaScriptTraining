import { AlarmClock } from "./index.js";

describe('アプローチが無い時のテスト', () => {
    let clock;

    beforeEach(() => {
        clock = new AlarmClock();
    });

    test('「通常状態」から「アラームセット中」への遷移', () => {
        expect(clock.setAlarm()).toEqual("none");
    });

    test('「アラームセット中」から「通常状態」への遷移', () => {
        clock.setAlarm();
        expect(clock.cancelAlarm()).toEqual("none");
    });


    test('「アラームセット中」から「アラーム鳴中」への遷移', () => {
        clock.setAlarm();
        expect(clock.reachedToAlarmTime()).toEqual("soundAlarm");
    });

    test('「アラーム鳴中」から「通常状態」への遷移', () => {
        clock.setAlarm();
        clock.reachedToAlarmTime();
        expect(clock.cancelAlarm()).toEqual("stopAlarm");
    });

    test('「アラーム鳴中」から「スヌーズ中」への遷移', () => {
        clock.setAlarm();
        clock.reachedToAlarmTime();
        expect(clock.snooze()).toEqual("stopAlarm");
    });

    test('「スヌーズ中」から「アラーム鳴中」への遷移', () => {
        clock.setAlarm();
        clock.reachedToAlarmTime();
        clock.snooze();
        expect(clock.elapseSnoozeTime()).toEqual("soundAlarm");
    });

    test('「スヌーズ中」から「通常状態」への遷移', () => {
        clock.setAlarm();
        clock.reachedToAlarmTime();
        clock.snooze();
        expect(clock.cancelAlarm()).toEqual("none");
    });
});

describe('アプローチがある時のテスト', () => {
    let clock;

    beforeEach(() => {
        clock = new AlarmClock();
    });

    test('「通常状態」から「アラームセット中」への遷移', () => {
        expect(clock.setAlarm()).toEqual("none");
    });

    test('「アラームセット中」から「通常状態」への遷移', () => {
        clock.setState("alarmSet");
        expect(clock.cancelAlarm()).toEqual("none");
    });

    test('「アラームセット中」から「アラーム鳴中」への遷移', () => {
        clock.setState("alarmSet");
        expect(clock.reachedToAlarmTime()).toEqual("soundAlarm");
    });

    test('「アラーム鳴中」から「通常状態」への遷移', () => {
        clock.setState("alarmSounding");
        expect(clock.cancelAlarm()).toEqual("stopAlarm");
    });

    test('「アラーム鳴中」から「スヌーズ中」への遷移', () => {
        clock.setState("alarmSounding");
        expect(clock.snooze()).toEqual("stopAlarm");
    });

    test('「スヌーズ中」から「アラーム鳴中」への遷移', () => {
        clock.setState("snoozing");
        expect(clock.elapseSnoozeTime()).toEqual("soundAlarm");
    });

    test('「スヌーズ中」から「通常状態」への遷移', () => {
        clock.setState("snoozing");
        expect(clock.cancelAlarm()).toEqual("none");
    });
});