// NovaChess - Lesson Content Data
export const lessonContent = {
  // Basics Category
  basics: [
    {
      id: 1,
      title: 'How to Move Pieces',
      duration: '5 min',
      difficulty: 'Beginner',
      completed: true,
      content: {
        sections: [
          {
            title: 'The Chess Board',
            content: 'The chess board has 64 squares arranged in 8x8 grid. Each square has a unique coordinate (like e4, d5). The board is positioned so that each player has a light square in the bottom-right corner.',
            image: 'board_setup'
          },
          {
            title: 'Pawn Movement',
            content: 'Pawns move forward one square at a time, but can move two squares on their first move. They capture diagonally one square forward. Pawns cannot move backward.',
            image: 'pawn_movement'
          },
          {
            title: 'Rook Movement',
            content: 'Rooks move horizontally and vertically any number of squares. They cannot jump over other pieces. Rooks are powerful in open positions.',
            image: 'rook_movement'
          },
          {
            title: 'Knight Movement',
            content: 'Knights move in an L-shape: two squares in one direction, then one square perpendicular. Knights are the only pieces that can jump over other pieces.',
            image: 'knight_movement'
          },
          {
            title: 'Bishop Movement',
            content: 'Bishops move diagonally any number of squares. Each player starts with one light-squared bishop and one dark-squared bishop.',
            image: 'bishop_movement'
          },
          {
            title: 'Queen Movement',
            content: 'The queen combines the powers of rook and bishop. It can move horizontally, vertically, and diagonally any number of squares.',
            image: 'queen_movement'
          },
          {
            title: 'King Movement',
            content: 'The king moves one square in any direction. The king cannot move into check. The game ends when the king is checkmated.',
            image: 'king_movement'
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Basic Checkmate Patterns',
      duration: '10 min',
      difficulty: 'Beginner',
      completed: true,
      content: {
        sections: [
          {
            title: 'What is Checkmate?',
            content: 'Checkmate occurs when the king is in check and cannot escape. The game ends immediately when checkmate is achieved.',
            image: 'checkmate_basic'
          },
          {
            title: 'Back Rank Mate',
            content: 'A common checkmate pattern where the king is trapped on the back rank (first or eighth rank) by its own pawns and attacked by a rook or queen.',
            image: 'back_rank_mate'
          },
          {
            title: 'Scholar\'s Mate',
            content: 'A quick checkmate in 4 moves: 1.e4 e5 2.Qh5 Nc6 3.Bc4 Nf6 4.Qxf7#. This pattern attacks the f7 square with queen and bishop.',
            image: 'scholars_mate'
          },
          {
            title: 'Fool\'s Mate',
            content: 'The fastest possible checkmate in chess: 1.f3 e5 2.g4 Qh4#. This occurs when White makes very poor opening moves.',
            image: 'fools_mate'
          },
          {
            title: 'Smothered Mate',
            content: 'A checkmate where the king is surrounded by its own pieces and cannot escape. Often delivered by a knight.',
            image: 'smothered_mate'
          },
          {
            title: 'Anastasia\'s Mate',
            content: 'A checkmate pattern involving a rook and knight working together to trap the king in the corner.',
            image: 'anastasia_mate'
          }
        ]
      }
    },
    {
      id: 3,
      title: 'Castling',
      duration: '8 min',
      difficulty: 'Beginner',
      completed: false,
      content: {
        sections: [
          {
            title: 'What is Castling?',
            content: 'Castling is a special move that involves the king and one rook. It is the only move where two pieces move at once.',
            image: 'castling_basic'
          },
          {
            title: 'Kingside Castling',
            content: 'The king moves two squares toward the rook, and the rook moves to the square the king crossed. Notation: O-O',
            image: 'kingside_castling'
          },
          {
            title: 'Queenside Castling',
            content: 'Similar to kingside but on the queenside. The king moves two squares toward the queenside rook. Notation: O-O-O',
            image: 'queenside_castling'
          },
          {
            title: 'Castling Rules',
            content: 'You cannot castle if: the king or rook has moved, the king is in check, the king would pass through check, or there are pieces between king and rook.',
            image: 'castling_rules'
          }
        ]
      }
    },
    {
      id: 4,
      title: 'En Passant',
      duration: '6 min',
      difficulty: 'Beginner',
      completed: false,
      content: {
        sections: [
          {
            title: 'What is En Passant?',
            content: 'En passant is a special pawn capture that can only occur under specific conditions when a pawn moves two squares.',
            image: 'en_passant_basic'
          },
          {
            title: 'How to Capture En Passant',
            content: 'If an opponent\'s pawn moves two squares and lands next to your pawn, you can capture it as if it moved only one square.',
            image: 'en_passant_capture'
          },
          {
            title: 'En Passant Rules',
            content: 'En passant must be played immediately or the opportunity is lost. It can only be done on the very next move.',
            image: 'en_passant_rules'
          }
        ]
      }
    }
  ],

  // Openings Category
  openings: [
    {
      id: 5,
      title: 'Opening Principles',
      duration: '15 min',
      difficulty: 'Intermediate',
      completed: false,
      content: {
        sections: [
          {
            title: 'Control the Center',
            content: 'The center squares (e4, e5, d4, d5) are the most important. Control them with pawns and pieces.',
            image: 'center_control'
          },
          {
            title: 'Develop Your Pieces',
            content: 'Get your knights and bishops out early. Don\'t move the same piece twice in the opening unless necessary.',
            image: 'piece_development'
          },
          {
            title: 'Castle Early',
            content: 'Get your king to safety by castling. This also connects your rooks.',
            image: 'early_castling'
          },
          {
            title: 'Don\'t Bring Out the Queen Too Early',
            content: 'The queen is powerful but vulnerable. Develop other pieces first to avoid losing time.',
            image: 'queen_development'
          }
        ]
      }
    },
    {
      id: 6,
      title: 'Italian Game',
      duration: '20 min',
      difficulty: 'Intermediate',
      completed: false,
      content: {
        sections: [
          {
            title: 'Italian Game Basics',
            content: 'The Italian Game starts with 1.e4 e5 2.Nf3 Nc6 3.Bc4. It focuses on rapid development and attacking the f7 square.',
            image: 'italian_basic'
          },
          {
            title: 'Main Variations',
            content: 'Common responses include Bc5 (Giuoco Piano), Nf6 (Two Knights Defense), and Be7 (Hungarian Defense).',
            image: 'italian_variations'
          },
          {
            title: 'Typical Plans',
            content: 'White often plays d3, c3, and Qb3 to attack the f7 square. Black should develop quickly and castle.',
            image: 'italian_plans'
          }
        ]
      }
    },
    {
      id: 7,
      title: 'Sicilian Defense',
      duration: '25 min',
      difficulty: 'Advanced',
      completed: false,
      content: {
        sections: [
          {
            title: 'Sicilian Basics',
            content: 'The Sicilian Defense (1.e4 c5) is Black\'s most popular response to 1.e4. It creates an asymmetrical position.',
            image: 'sicilian_basic'
          },
          {
            title: 'Main Variations',
            content: 'Popular variations include the Najdorf, Dragon, and Scheveningen. Each has different characteristics.',
            image: 'sicilian_variations'
          },
          {
            title: 'Strategic Ideas',
            content: 'Black aims for counterplay on the queenside while White attacks on the kingside.',
            image: 'sicilian_strategy'
          }
        ]
      }
    }
  ],

  // Tactics Category
  tactics: [
    {
      id: 8,
      title: 'Tactical Patterns',
      duration: '12 min',
      difficulty: 'Intermediate',
      completed: false,
      content: {
        sections: [
          {
            title: 'What are Tactics?',
            content: 'Tactics are short-term combinations that gain material or create threats. They are the building blocks of chess.',
            image: 'tactics_basic'
          },
          {
            title: 'Forks',
            content: 'A fork attacks two or more pieces simultaneously. Knights are excellent forking pieces.',
            image: 'fork_tactic'
          },
          {
            title: 'Pins',
            content: 'A pin prevents a piece from moving because it would expose a more valuable piece behind it.',
            image: 'pin_tactic'
          },
          {
            title: 'Skewers',
            content: 'A skewer is like a pin in reverse - a more valuable piece is attacked and must move, exposing a less valuable piece.',
            image: 'skewer_tactic'
          },
          {
            title: 'Discovered Attacks',
            content: 'A discovered attack occurs when moving one piece reveals an attack by another piece.',
            image: 'discovered_attack'
          }
        ]
      }
    },
    {
      id: 9,
      title: 'Sacrifice Patterns',
      duration: '18 min',
      difficulty: 'Advanced',
      completed: false,
      content: {
        sections: [
          {
            title: 'What is a Sacrifice?',
            content: 'A sacrifice is giving up material for positional or tactical advantages. Not all sacrifices are sound.',
            image: 'sacrifice_basic'
          },
          {
            title: 'King Attack Sacrifices',
            content: 'Common sacrifices to break open the king\'s position include Bxh7+, Nxf7+, and Qh5+ patterns.',
            image: 'king_attack_sacrifice'
          },
          {
            title: 'Positional Sacrifices',
            content: 'Sometimes you sacrifice material for long-term positional advantages like better piece activity.',
            image: 'positional_sacrifice'
          }
        ]
      }
    }
  ],

  // Endgames Category
  endgames: [
    {
      id: 10,
      title: 'Endgame Fundamentals',
      duration: '20 min',
      difficulty: 'Advanced',
      completed: false,
      content: {
        sections: [
          {
            title: 'What is the Endgame?',
            content: 'The endgame begins when most pieces have been exchanged. King activity becomes crucial.',
            image: 'endgame_basic'
          },
          {
            title: 'King and Pawn vs King',
            content: 'The most basic endgame. Learn when a pawn can promote and when it cannot.',
            image: 'kp_vs_k'
          },
          {
            title: 'Opposition',
            content: 'Opposition is a key concept in king and pawn endgames. The king that has opposition often wins.',
            image: 'opposition'
          },
          {
            title: 'Square of the Pawn',
            content: 'A method to determine if a king can catch a passed pawn. Draw an imaginary square from the pawn to the promotion square.',
            image: 'square_of_pawn'
          }
        ]
      }
    },
    {
      id: 11,
      title: 'Rook Endgames',
      duration: '25 min',
      difficulty: 'Advanced',
      completed: false,
      content: {
        sections: [
          {
            title: 'Rook Endgame Basics',
            content: 'Rook endgames are the most common type of endgame. Learn the fundamental principles.',
            image: 'rook_endgame_basic'
          },
          {
            title: 'Lucena Position',
            content: 'A winning technique in rook endgames where you use your rook to shield your king from checks.',
            image: 'lucena_position'
          },
          {
            title: 'Philidor Position',
            content: 'A defensive technique to draw a rook endgame when you\'re down a pawn.',
            image: 'philidor_position'
          }
        ]
      }
    }
  ]
};

export const getLessonById = (id) => {
  for (const category in lessonContent) {
    const lesson = lessonContent[category].find(l => l.id === id);
    if (lesson) return lesson;
  }
  return null;
};

export const getLessonsByCategory = (category) => {
  return lessonContent[category] || [];
};

export const getAllLessons = () => {
  const allLessons = [];
  for (const category in lessonContent) {
    allLessons.push(...lessonContent[category]);
  }
  return allLessons;
};
