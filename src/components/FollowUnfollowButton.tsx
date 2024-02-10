import FollowButton from "./sub-components/FollowButton";
import UnfollowButton from "./sub-components/UnfollowButton";

interface FollowUnfollowButtonProps {
  followerId: string;
  followingId: string;
}

export default function FollowUnfollowButton(props: FollowUnfollowButtonProps) {
  const { followerId, followingId } = props;

  const ifFollowing = false;
  return ifFollowing ? (
    <UnfollowButton followerId={followerId} followingId={followingId} />
  ) : (
    <FollowButton followerId={followerId} followingId={followingId} />
  );
}
