import { UserStatus } from './../constants/params.constants';

module.exports = {
  ifEqualUserIdOrUserStatus( userId: string, creatorUserId: string, userStatus: string, options: any ) {
    const isUserCreator = userId.toString() === creatorUserId.toString();
    const isRootStatus = userStatus === UserStatus.ADMIN || userStatus === UserStatus.MODERATOR;

    if ( isUserCreator || isRootStatus ) {
      return options.fn( this );
    } else {
      return options.inverse( this );
    }
  }
};
