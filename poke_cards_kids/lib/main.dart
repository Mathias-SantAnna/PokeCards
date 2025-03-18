import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';

void main() {
  runApp(PokeFeedGame());
}

class PokeFeedGame extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokémon Feeding Game',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Comic Sans',
      ),
      home: PokeFeedScreen(),
    );
  }
}

class PokeFeedScreen extends StatefulWidget {
  @override
  _PokeFeedScreenState createState() => _PokeFeedScreenState();
}

class _PokeFeedScreenState extends State<PokeFeedScreen> {
  final Map<String, int> fruitInventory = {
    'assets/fruits/apple.png': 10,
    'assets/fruits/banana.png': 8,
    'assets/fruits/berry.png': 5,
    'assets/fruits/grape.png': 7,
  };

  final String pokemonImage = 'assets/images/pikachu.png';
  final String pokemonSound = 'assets/audio/pikachu.mp3';
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool isEating = false;

  void _playSound(String audioPath) async {
    await _audioPlayer.play(AssetSource(audioPath));
  }

  void _feedPokemon(String fruit) {
    if (fruitInventory[fruit]! > 0) {
      setState(() {
        fruitInventory[fruit] = fruitInventory[fruit]! - 1;
        isEating = true;
      });
      _playSound(pokemonSound);
      Future.delayed(Duration(seconds: 1), () {
        setState(() {
          isEating = false;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Feed Pikachu!')),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: DragTarget<String>(
                onAccept: (fruit) => _feedPokemon(fruit),
                builder: (context, candidateData, rejectedData) {
                  return Column(
                    children: [
                      Image.asset(
                        pokemonImage,
                        width: 200,
                        height: 200,
                      ),
                      if (isEating)
                        Text(
                          'Yummy!',
                          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.green),
                        ),
                    ],
                  );
                },
              ),
            ),
          ),
          Container(
            height: 100,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: fruitInventory.length,
              itemBuilder: (context, index) {
                String fruit = fruitInventory.keys.elementAt(index);
                return Draggable<String>(
                  data: fruit,
                  feedback: Image.asset(fruit, width: 50, height: 50),
                  childWhenDragging: Opacity(
                    opacity: 0.5,
                    child: Image.asset(fruit, width: 50, height: 50),
                  ),
                  child: Column(
                    children: [
                      Image.asset(fruit, width: 50, height: 50),
                      Text('x${fruitInventory[fruit]}', style: TextStyle(fontSize: 18)),
                    ],
                  ),
                );
              },
            ),
          ),
          SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: Text('Back to Menu'),
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}
