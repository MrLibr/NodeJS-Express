import { UserStatus } from './../constants/params.constants';

module.exports = {
  ifEqualUserIdOrUserStatus( userId: string | null, creatorUserId: string, userStatus: string | null, options: any ) {
    const isUserCreator = userId
      ? userId.toString() === creatorUserId.toString()
      : false;
    const isRootStatus = userStatus
      ? userStatus === UserStatus.ADMIN || userStatus === UserStatus.MODERATOR
      : false;

    if ( isUserCreator || isRootStatus ) {
      return options.fn( this );
    } else {
      return options.inverse( this );
    }
  }
};
