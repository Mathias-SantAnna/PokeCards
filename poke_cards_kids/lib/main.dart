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
    'assets/fruits/GoldenRazzBerry.png': 10,
    'assets/fruits/NanabBerry.png': 8,
    'assets/fruits/RazzBerry.png': 5,
    'assets/fruits/PinapBerry.png': 7,
  };

  final String pokemonImage = 'assets/images/pikachu.png';
  final String pokemonSound = 'assets/audio/pikachu-pikapi.mp3';
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool isEating = false;

  void _playSound(String audioPath) async {
    try {
      final player = AudioPlayer();
      await player.setSource(AssetSource(audioPath));
      await player.play(AssetSource(audioPath)); // Use play instead of resume
    } catch (e) {
      print('Error playing sound: $e');
    }
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
                        width: 600,  // Increased size
                        height: 600, // Increased size
                        fit: BoxFit.contain,
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
            height: 120, // Slightly increased height for fruit selection
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: fruitInventory.length,
              itemBuilder: (context, index) {
                String fruit = fruitInventory.keys.elementAt(index);
                return Draggable<String>(
                  data: fruit,
                  feedback: Image.asset(fruit, width: 60, height: 60),
                  childWhenDragging: Opacity(
                    opacity: 0.5,
                    child: Image.asset(fruit, width: 60, height: 60),
                  ),
                  child: Column(
                    children: [
                      Image.asset(fruit, width: 60, height: 60),
                      Text('x${fruitInventory[fruit]}', style: TextStyle(fontSize: 18)),
                    ],
                  ),
                );
              },
            ),
          ),
          SizedBox(height: 20),
          ElevatedButton(
            onPressed: ()  => _playSound('assets/audio/pikachu-pikapi.mp3'),
            child: Text('test sound'),
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}