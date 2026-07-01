import Problem from "../models/Problem.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Problem.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "reportedBy",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $group: {
          _id: "$reportedBy",

          name: {
            $first: "$user.name",
          },

          reports: {
            $sum: 1,
          },

          resolved: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "resolved",
                  ],
                },
                1,
                0,
              ],
            },
          },

          totalUpvotes: {
            $sum: "$upvotes",
          },
        },
      },

      {
        $addFields: {
          points: {
            $add: [
              {
                $multiply: [
                  "$reports",
                  10,
                ],
              },

              {
                $multiply: [
                  "$resolved",
                  20,
                ],
              },

              {
                $multiply: [
                  "$totalUpvotes",
                  2,
                ],
              },
            ],
          },
        },
      },

      {
        $sort: {
          points: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};