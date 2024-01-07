const randomMotivationalVideo = [
    "6L6XqWoS8tw",
    "d-uyxvQ7fb4",
    "hm8Ca71wIBU",
    "S3yO6xfSHAI",
    "8JAtDMB0L64",
    "7nQ9OIcCY8w",
    "JUanGsriFwc",
    "dyt2FkRN2TY",
    "_jRaDAYZrig",
    "wupToqz1e2g",
    "_bsX5DEhxoY",
    "tFe_npDURmU",
    "1JtMv_Z2UPY",
    "JVLQZTXbm8w",
    "bTMvYpTmi_I",
    "MXg6Usdjl5c",
    "3hRfDmFXpsY",
    "LzGAuyuIA1Q"
  ];

  const randomBhaktiVideo = [
    "fdD4_lexi7s",
    "HH1PXnKg2LU",
    "s4kPqE9c4yg",
    "NPwAekuTiTc",
    "Oln-sxTvQ7Q",
    "DOqHLx34FBo",
    "iHdYhdDg1Co",
    "wKWfVdc6ekA",
    "Ad5qG5qWdLY",
    "BOnxCtKA1VE",
    "gvu891ubYWE",
    "NW7-O2fnl1Y",
    "MxGItnRhsBI"
  ];
  
  const randomSongVideo = [
   "b1A_kw285eI",
    "mOEL8Q-2bSo",
    "UsuF4jJ4sgA",
    "1XwYoWDvDLA",
    "9iIX4PBplAY",
    "EfIXAzSy-Uk",
    "YKcmMmJlKNk",
    "ycS5PagXvhQ",
    "jAUSF4_ygJg",
    "qF179mXIahE",
    "miJXSrm3gz4",
    "ldlMb2ZT9mg",
    "ts7oLiVqwb0",
    "phcltUsSYbI",
    "4MOV2I1QVoU",
    "_wMsvhz8YSk",
    "SRwJxqtD5i4",
    "OsTGp5n6w5E",
    "eizmCZv3aKI",
    "IzLev_znvyI",
    "uCGD9dT12C0",
    "YYOKMUTTDdA",
    "4h1bacPNTkA",
    "0J0HZrDvbjY",
    "vURbICF6T5U",
    "X7WXHhokylc",
    "8sLS2knUa6Y",
    "GtPvCa3vvxA",
    "89lgb7dmXps",
    "hBqxCILVLxQ",
    "G55PDzplLpo",
    "sPSTp3Ik-to",
    "AX7t8ZwroHQ",
    "lZ2PhyBF3GQ",
    "Le4-vjVqN6Q",
    "k3t9DArQsrk",
    "MubIw4MGLy0",
    "Mo5tQDcs__g",
    "lyWHtKq1PcQ",
    "pw59ySNWAjs",
    "_8tFJ4cymyU",
    "iwhpS4ow7Zc",
    "pxCWiYFkvTg",
    "8h12ccQgnVU",
    "d4_szl5EEww",
    "n_4hlSkbqyQ",
    "i9eTTZwCUHk",
    "vX2cDW8LUWk",
    "HPsxxBhv9kc",
    "W0DM5lcj6mw",
    "_ikZtcgAMxo",
    "9ZGpAlOztmE",
    "sWomecSi-xg",
    "qO4qS1U6gbc"
  ];

  export const fetchTwoMotivationalVideos = () => {
    const shuffledVideos = shuffleArray([...randomMotivationalVideo]); 
    return [shuffledVideos[0], shuffledVideos[1]];
  };
  

export const fetchTwoBhaktiVideo = () => {
    const shuffledVideos = shuffleArray([...randomBhaktiVideo]); 
    return [shuffledVideos[0], shuffledVideos[1]];
}


export const fetchTwoSongVideo = () => {
    const shuffledVideos = shuffleArray([...randomSongVideo]); 
    return [shuffledVideos[0], shuffledVideos[1], shuffledVideos[2]];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  }

  