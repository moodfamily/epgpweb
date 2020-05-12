import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, switchMap, map } from 'rxjs/operators';
import { useState, useEffect, useMemo } from 'react';

export interface Member {
  _id: string;
  name: string;
  className: string;
  EP: number;
  GP: number;
  PR: number;
}

const processMembers = (membersRawData: Member[]) =>
  membersRawData.map((member: Member) => ({
    ...member,
    key: member._id,
    PR: Number((member.EP / member.GP).toFixed(2)),
  }));

export const useMemberCollections = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const refetchMembersSubject = useMemo(() => new Subject<string>(), []);

  useEffect(() => {
    const subscription = ajax('/member/listCollectionDates')
      .pipe(
        map((res) => res.response),
        tap((dateResponse) => setDates(dateResponse.map((d: string) => new Date(d)))),
        switchMap((dateResponse) => ajax(`/member/listCollection/${dateResponse[dateResponse.length - 1]}`)),
        map((res) => res.response),
        map((members) => processMembers(members[0].data)),
        tap((members) => setMembers(members)),
      )
      .subscribe();

    const refetchSubscription = refetchMembersSubject
      .pipe(
        switchMap((selectedDate) => ajax(`/member/listCollection/${selectedDate}`)),
        map((res) => res.response),
        map((members) => processMembers(members[0].data)),
        tap((members) => setMembers(members)),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      refetchSubscription.unsubscribe();
    };
  }, [refetchMembersSubject]);

  return {
    dates,
    members,
    refetchMembersSubject,
  };
};
